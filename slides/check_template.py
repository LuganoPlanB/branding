"""Check Office packaging, master/layout structure and editability without dependencies."""
from pathlib import Path, PurePosixPath
import posixpath
import zipfile
import xml.etree.ElementTree as ET

root=Path(__file__).resolve().parent
ns={'p':'http://schemas.openxmlformats.org/presentationml/2006/main','a':'http://schemas.openxmlformats.org/drawingml/2006/main'}
for filename,kind in [('planb-starter.pptx','presentation'),('planb-template.potx','template')]:
    with zipfile.ZipFile(root/filename) as z:
        assert z.testzip() is None
        names=set(z.namelist())
        ct=z.read('[Content_Types].xml').decode()
        assert f'presentationml.{kind}.main+xml' in ct
        slides=[n for n in names if n.startswith('ppt/slides/slide') and n.endswith('.xml') and '/_rels/' not in n]
        layouts=[n for n in names if n.startswith('ppt/slideLayouts/slideLayout') and n.endswith('.xml') and '/_rels/' not in n]
        assert len(slides)==10 and len(layouts)==11
        for layout in layouts:
            tree=ET.fromstring(z.read(layout)); assert tree.find('p:cSld',ns).get('name').startswith('Plan B / ')
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
        print(f'PASS {filename}: 10 slides, 11 named layouts, 16:9, Inter theme, editable chart/workbook and table, valid XML and relationships.')
