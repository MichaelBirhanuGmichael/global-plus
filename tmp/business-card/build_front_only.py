from reportlab.pdfgen import canvas
from reportlab.lib.colors import HexColor, CMYKColor
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from pathlib import Path
from pypdf import PdfReader, PdfWriter
from pypdf.generic import RectangleObject
out=Path('output/pdf'); out.mkdir(parents=True,exist_ok=True)
pdfmetrics.registerFont(TTFont('Garamond','C:/Windows/Fonts/GARA.TTF'))
pdfmetrics.registerFont(TTFont('Arial','C:/Windows/Fonts/arial.ttf'))
pdfmetrics.registerFont(TTFont('ArialBold','C:/Windows/Fonts/arialbd.ttf'))
navy=HexColor('#102744'); gold=HexColor('#B08A48'); white=HexColor('#FFFFFF'); pale=HexColor('#DCE2E9')
W,H=90*mm,55*mm
logo='tmp/business-card/image1.png'
def tracking(c,txt,x,y,font,size,space,color,center=False):
 c.setFillColor(color)
 width=pdfmetrics.stringWidth(txt,font,size)+space*(len(txt)-1)
 t=c.beginText(x-width/2 if center else x,y); t.setFont(font,size); t.setCharSpace(space); t.textOut(txt); c.drawText(t)
def face(c,side,bleed):
 c.setFillColor(white); c.rect(-bleed,-bleed,W+2*bleed,H+2*bleed,fill=1,stroke=0)
 c.drawImage(logo,6*mm,33*mm,width=20*mm,height=16.06*mm,mask='auto')
 tracking(c,'GLOBAL PLUS',31*mm,43.6*mm,'Garamond',17,.45,navy)
 tracking(c,'BUSINESS GROUP',31*mm,38.4*mm,'Arial',7.1,1.15,navy)
 tracking(c,'ONE MEMBER PLC',31*mm,34.3*mm,'Arial',5.8,.9,navy)
 c.setFillColor(navy); c.rect(-bleed,-bleed,W+2*bleed,28*mm+bleed,fill=1,stroke=0)
 c.setFillColor(gold); c.rect(-bleed,28*mm,W+2*bleed,.55*mm,fill=1,stroke=0)
 tracking(c,'BRANCH OFFICE',6*mm,22.1*mm,'ArialBold',6,1.25,gold)
 tracking(c,'Atsede Tesfa Building, 2A',6*mm,16.8*mm,'Arial',10,0,white)
 tracking(c,'Addis Ababa, Ethiopia',6*mm,12.2*mm,'Arial',7,0,pale)
 tracking(c,'0116901090',6*mm,5*mm,'Arial',15,.8,white)

def make(filename,press=False):
 offset=8*mm if press else 0
 c=canvas.Canvas(str(out/filename),pagesize=(W+2*offset,H+2*offset))
 c.setTitle('Global Plus | Atsede Tesfa Branch Business Card')
 c.setAuthor('Global Plus Business Group One Member PLC')
 for side in range(1):
  c.saveState(); c.translate(offset,offset); face(c,side,3*mm if press else 0); c.restoreState()
  if press:
   c.setStrokeColor(HexColor('#222222')); c.setLineWidth(.25)
   for x in [offset,offset+W]:
    c.line(x,offset-6*mm,x,offset-4*mm); c.line(x,offset+H+4*mm,x,offset+H+6*mm)
   for y in [offset,offset+H]:
    c.line(offset-6*mm,y,offset-4*mm,y); c.line(offset+W+4*mm,y,offset+W+6*mm,y)
  c.showPage()
 c.save()
 if press:
  r=PdfReader(str(out/filename)); w=PdfWriter()
  for p in r.pages:
   p.trimbox=RectangleObject([offset,offset,offset+W,offset+H]); p.bleedbox=RectangleObject([offset-3*mm,offset-3*mm,offset+W+3*mm,offset+H+3*mm]); w.add_page(p)
  w.add_metadata({'/Title':'Global Plus Business Card - 90 x 55 mm - 3 mm bleed'})
  with open(out/filename,'wb') as f: w.write(f)
make('Global_Plus_Business_Card_Front_Only.pdf')
make('Global_Plus_Business_Card_Front_Only_Print.pdf',True)
for f in out.glob('Global_Plus_Business_Card_Front_Only*.pdf'):
 r=PdfReader(f); print(f, len(r.pages), 'pages'); print(' | '.join(p.extract_text() for p in r.pages))
