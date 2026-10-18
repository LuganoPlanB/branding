"""Check Office packaging, master/layout structure and editability without dependencies."""
from pathlib import Path, PurePosixPath
import json
import re
import posixpath
import zipfile
import xml.etree.ElementTree as ET

root=Path(__file__).resolve().parent
ns={'p':'http://schemas.openxmlformats.org/presentationml/2006/main','a':'http://schemas.openxmlformats.org/drawingml/2006/main'}
tokens=json.loads((root.parent/'tokens/tokens.json').read_text())
packages=[(f'planb-{stem}-{mode}.{ext}',kind,mode) for mode in ('light','dark') for stem,ext,kind in [('starter','pptx','presentation'),('template','potx','template')]]
packages += [('planb-starter.pptx','presentation','light'),('planb-template.potx','template','light')]
for filename,kind,mode in packages:
    with zipfile.ZipFile(root/filename) as z:
        assert z.testzip() is None
        names=set(z.namelist())
        ct=z.read('[Content_Types].xml').decode()
        assert f'presentationml.{kind}.main+xml' in ct
        slides=[n for n in names if n.startswith('ppt/slides/slide') and n.endswith('.xml') and '/_rels/' not in n]
        layouts=[n for n in names if n.startswith('ppt/slideLayouts/slideLayout') and n.endswith('.xml') and '/_rels/' not in n]
        assert len(slides)==13 and len(layouts)==11
        for layout in layouts:
            tree=ET.fromstring(z.read(layout)); assert tree.find('p:cSld',ns).get('name').startswith('Plan B / ')
            assert tree.get('showMasterSp')=='1','Layout artwork must remain visible'
            expected=[(str(int(pos)*1000),color.lstrip('#').upper()) for color,pos in re.findall(r'(#[0-9a-fA-F]{6}) (\d+)%',tokens[mode]['--planb-gradient-rainbow'])]
            gradients=tree.findall('.//a:gradFill',ns)
            assert gradients, f'{layout} must include a visible brand gradient'
            for gradient in gradients:
                actual=[(stop.get('pos'),stop.find('a:srgbClr',ns).get('val')) for stop in gradient.findall('a:gsLst/a:gs',ns)]
                assert actual==expected,(filename,actual,expected)
            for props in tree.findall('.//p:spPr',ns):
                gradient=props.find('a:gradFill',ns)
                if gradient is not None:
                    children=list(props)
                    assert children.index(props.find('a:prstGeom',ns)) < children.index(gradient), 'DrawingML geometry must precede fill'
                    extent=props.find('a:xfrm/a:ext',ns)
                    assert int(extent.get('cy'))>=91440, 'Gradient band must be at least 0.1 inches tall'
            for shape in tree.findall('.//p:sp',ns):
                if shape.find('p:spPr/a:gradFill',ns) is not None:
                    assert shape.find('p:style',ns) is None, 'Gradient must not inherit Office shadow effects'
            bg=tree.find('p:cSld/p:bg/p:bgPr/a:solidFill/a:srgbClr',ns).get('val').lower()
            assert bg in [tokens[mode][key].lstrip('#') for key in ('--planb-color-canvas','--planb-color-canvas-alt')], (filename,layout,bg)
        for slide in slides:
            tree=ET.fromstring(z.read(slide))
            assert tree.get('showMasterSp')=='1','Slide must display inherited artwork'
            for shape in tree.findall('.//p:sp',ns):
                for p in shape.findall('p:txBody/a:p',ns):
                    if p.find('a:r',ns) is not None:
                        props=p.find('a:pPr',ns)
                        assert props is not None and props.get('algn')=='l','Explicit left alignment required'
                        assert props.find('a:buNone',ns) is not None,'Default bullets must be disabled'
        # Editing contract: cover artwork is on the slide, not buried in a layout.
        cover=ET.fromstring(z.read('ppt/slides/slide1.xml'))
        cover_shapes={sh.find('p:nvSpPr/p:cNvPr',ns).get('name'):sh for sh in cover.findall('p:cSld/p:spTree/p:sp',ns)}
        assert 'Cover / Editable values' in cover_shapes
        assert 'Cover / Background panel' in cover_shapes
        movable=cover_shapes['Cover / Movable gradient']
        assert movable.find('p:spPr/a:gradFill',ns) is not None
        assert movable.find('p:spPr/a:xfrm/a:off',ns).get('y')=='0', 'Large gradient belongs at the top by default'
        assert len(cover.findall('p:cSld/p:spTree/p:pic',ns))==1
        for layout in layouts:
            assert b'Cover /' not in z.read(layout), 'Cover artwork must remain directly selectable'
        # All nine original vector files must be embedded without modification.
        assert len(z.namelist())==len(names), 'Duplicate ZIP entries are invalid'
        for form in ('wide','square','tall'):
            for variant in ('color','black','white'):
                assert z.read(f'ppt/media/planb-{form}-{variant}.svg') == (root.parent/f'assets/logos/lugano_planb_2026_logo_{form}_{variant}.svg').read_bytes()
        for number in (11,12,13):
            library=ET.fromstring(z.read(f'ppt/slides/slide{number}.xml'))
            pictures=library.findall('p:cSld/p:spTree/p:pic',ns)
            assert len(pictures)==3, 'Each library slide must offer three selectable logos'
            for picture in pictures:
                assert any(node.tag.endswith('}svgBlip') for node in picture.iter()), 'Logos must retain SVG payloads'
        master=ET.fromstring(z.read('ppt/slideMasters/slideMaster1.xml'))
        master_text=[''.join(shape.itertext()) for shape in master.findall('p:cSld/p:spTree/p:sp',ns)]
        assert master_text==['Plan B Foundation','Civic Digital Commons'], 'Both footer fields must be editable on the single parent master'
        for part in slides+layouts:
            data=z.read(part)
            assert b'Shared footer /' not in data, 'Do not duplicate footer text on slides or layouts'
        for part in slides+layouts+['ppt/slideMasters/slideMaster1.xml']:
            tree=ET.fromstring(z.read(part))
            ids=[node.get('id') for node in tree.findall('.//p:cNvPr',ns)]
            assert len(ids)==len(set(ids)), (part,'duplicate shape IDs')
        assert any(n.startswith('ppt/charts/chart') and n.endswith('.xml') for n in names)
        assert any(n.startswith('ppt/embeddings/') and n.endswith('.xlsx') for n in names)
        assert any(b'<a:tbl>' in z.read(n) for n in slides)
        assert 'Inter' in z.read('ppt/theme/theme1.xml').decode()
        pres=ET.fromstring(z.read('ppt/presentation.xml')); size=pres.find('p:sldSz',ns)
        assert abs(int(size.get('cx'))/int(size.get('cy'))-16/9)<.001
        for name in names:
            if name.endswith('.xml') or name.endswith('.rels'): ET.fromstring(z.read(name))
            if name.endswith('.rels'):
                base=PurePosixPath(name).parent.parent
                for rel in ET.fromstring(z.read(name)):
                    if rel.get('TargetMode')=='External': continue
                    target=posixpath.normpath(str(base/rel.get('Target'))).lstrip('/')
                    assert target in names,(name,target)
        print(f'PASS {filename}: {mode} palette, token-matched gradients on every layout; 13 slides, 11 named layouts, selectable SVG logos and cover gradient, shared master footer, 16:9, Inter theme, editable chart/workbook and table, valid XML and relationships.')

for stem,ext in [('starter','pptx'),('template','potx')]:
    assert (root/f'planb-{stem}.{ext}').read_bytes()==(root/f'planb-{stem}-light.{ext}').read_bytes(), 'Legacy URLs must match light edition'
