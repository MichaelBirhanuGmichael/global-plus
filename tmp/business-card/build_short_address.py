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
 c.setFillColor(white); c.rect(0,0,W,H,fill=1,stroke=0)
 c.drawImage(logo,6*mm,35.8*mm,width=18*mm,height=14.45*mm,mask='auto')
 tracking(c,'GLOBAL PLUS',29*mm,45*mm,'Garamond',17,.45,navy)
 tracking(c,'BUSINESS GROUP',29*mm,40*mm,'Arial',7.1,1.15,navy)
 tracking(c,'ONE MEMBER PLC',29*mm,36*mm,'Arial',5.8,.9,navy)
 c.setFillColor(navy); c.rect(0,0,W,31.5*mm,fill=1,stroke=0)
 c.setFillColor(gold); c.rect(0,31.5*mm,W,.5*mm,fill=1,stroke=0)
 tracking(c,'MAIN BRANCH',6*mm,26.4*mm,'ArialBold',6.2,.9,gold)
 tracking(c,'BRANCH OFFICE',50*mm,26.4*mm,'ArialBold',6.2,.8,gold)
 for txt,y in [('Bole Medhanialem',21.8),('Milkomy City Complex',18.2),('3rd floor, Office 310',14.6)]:
  tracking(c,txt,6*mm,y*mm,'Arial',7,0,white)
 for txt,y in [('Atsede Tesfa Building, 2A',21.8),('Addis Ababa, Ethiopia',18.2)]:
  tracking(c,txt,50*mm,y*mm,'Arial',7,0,white)
 tracking(c,'+251 11 666 2914',6*mm,5.4*mm,'Arial',9,0,white)
 tracking(c,'0116901090',50*mm,5.4*mm,'Arial',10,.25,white)
 c.setStrokeColor(gold); c.setLineWidth(.4); c.line(46*mm,5*mm,46*mm,27*mm)

c=canvas.Canvas('tmp/business-card/short_address.pdf',pagesize=(W,H))
face(c,0,0)
c.showPage(); c.save()
