"""Create desktop Inter Regular/Bold fonts from the bundled upstream variable font."""
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont

root=Path(__file__).resolve().parent/'fonts'
for weight,style in [(400,'Regular'),(700,'Bold')]:
    font=TTFont(root/'InterVariable.ttf')
    instantiateVariableFont(font,{'wght':weight,'opsz':14},inplace=True)
    names={1:'Inter',2:style,4:f'Inter {style}',6:f'Inter-{style}',16:'Inter',17:style}
    for rec in font['name'].names:
        if rec.nameID in names: rec.string=names[rec.nameID].encode(rec.getEncoding())
    font.save(root/f'Inter-{style}.ttf')
print('Created desktop Inter Regular and Bold from the bundled variable font.')
