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
 c.setFillColor(white if side==0 else navy); c.rect(-bleed,-bleed,W+2*bleed,H+2*bleed,fill=1,stroke=0)
 if side==0:
  c.drawImage(logo,W/2-11*mm,28.4*mm,width=22*mm,height=17.67*mm,mask='auto')
  tracking(c,'GLOBAL PLUS',W/2,21.1*mm,'Garamond',22,1.35,navy,True)
  tracking(c,'BUSINESS GROUP',W/2,15.4*mm,'Arial',8,2.0,navy,True)
  c.setStrokeColor(gold); c.setLineWidth(.65); c.line(W/2-5*mm,11.4*mm,W/2+5*mm,11.4*mm)
  tracking(c,'ONE MEMBER PLC',W/2,7.2*mm,'Arial',6.2,1.3,navy,True)
 else:
  tracking(c,'GLOBAL PLUS',7*mm,44.8*mm,'Garamond',13,.8,white)
  c.setFillColor(gold); c.rect(7*mm,39.9*mm,9*mm,.55*mm,fill=1,stroke=0)
  tracking(c,'BRANCH OFFICE',7*mm,33.5*mm,'ArialBold',6.3,1.65,gold)
  c.setFont('Arial',10.5); c.setFillColor(white); c.drawString(7*mm,26.6*mm,'Atsede Tesfa Building, 2A')
  c.setFont('Arial',8); c.setFillColor(pale); c.drawString(7*mm,21.5*mm,'Addis Ababa, Ethiopia')
  tracking(c,'0116901090',7*mm,9.3*mm,'Arial',18,1.0,white)
  c.setStrokeColor(gold); c.setLineWidth(.55); c.line(83*mm,7*mm,83*mm,17*mm)
def make(filename,press=False):
 offset=8*mm if press else 0
 c=canvas.Canvas(str(out/filename),pagesize=(W+2*offset,H+2*offset))
 c.setTitle('Global Plus | Atsede Tesfa Branch Business Card')
 c.setAuthor('Global Plus Business Group One Member PLC')
 for side in range(2):
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
make('Global_Plus_Business_Card.pdf')
make('Global_Plus_Business_Card_Print.pdf',True)
for f in out.glob('Global_Plus_Business_Card*.pdf'):
 r=PdfReader(f); print(f, len(r.pages), 'pages'); print(' | '.join(p.extract_text() for p in r.pages))
