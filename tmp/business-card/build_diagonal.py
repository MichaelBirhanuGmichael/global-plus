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
from reportlab.graphics.barcode.qr import QrCodeWidget
from reportlab.graphics.shapes import Drawing
from reportlab.graphics import renderPDF
navy=HexColor('#152B60'); orange=HexColor('#EE891F')
c=canvas.Canvas('output/pdf/Global_Plus_Abreha_Abera_Diagonal_Card.pdf',pagesize=(W,H))
c.setTitle('Global Plus - Abreha Abera - General Manager')
c.setAuthor('Global Plus Business Group One Member PLC')
c.setFillColor(navy); c.rect(0,0,W,H,fill=1,stroke=0)
# Sweeping folded panels echo the supplied reference in the company palette.
p=c.beginPath(); p.moveTo(0,55*mm); p.lineTo(53*mm,55*mm); p.lineTo(36*mm,28*mm); p.curveTo(32*mm,21*mm,28*mm,22*mm,23*mm,25*mm); p.lineTo(0,30.5*mm); p.close()
c.setFillColor(orange); c.drawPath(p,fill=1,stroke=0)
p=c.beginPath(); p.moveTo(0,55*mm); p.lineTo(49.5*mm,55*mm); p.lineTo(33.5*mm,29*mm); p.curveTo(30.5*mm,24*mm,27*mm,24.5*mm,23*mm,27*mm); p.lineTo(0,32*mm); p.close()
c.setFillColor(white); c.drawPath(p,fill=1,stroke=0)
p=c.beginPath(); p.moveTo(60*mm,0); p.lineTo(90*mm,0); p.lineTo(90*mm,2.1*mm); p.close()
c.setFillColor(orange); c.drawPath(p,fill=1,stroke=0)
c.drawImage(logo,13*mm,40.5*mm,width=14*mm,height=11.25*mm,mask='auto')
tracking(c,'GLOBAL PLUS',20*mm,36.3*mm,'Garamond',12,.3,navy,True)
tracking(c,'BUSINESS GROUP',20*mm,32.7*mm,'Arial',5.5,.6,navy,True)
tracking(c,'ONE MEMBER PLC',20*mm,29.7*mm,'Arial',4.8,.35,navy,True)
tracking(c,'Abreha Abera',50*mm,48*mm,'ArialBold',10.6,0,white)
tracking(c,'GENERAL MANAGER',50*mm,43.8*mm,'Arial',5.5,.5,orange)
tracking(c,'globalplus.com.et',50*mm,40.2*mm,'Arial',6.5,0,white)

c.linkURL('https://globalplus.com.et',(50*mm,39.3*mm,80*mm,42.5*mm),relative=0,thickness=0)
qr=QrCodeWidget('https://globalplus.com.et',barLevel='M',barBorder=4)
qr.barFillColor=navy
x0,y0,x1,y1=qr.getBounds(); qsize=18*mm
c.setFillColor(white); c.rect(67*mm,21.5*mm,qsize,qsize,fill=1,stroke=0)
d=Drawing(qsize,qsize,transform=[qsize/(x1-x0),0,0,qsize/(y1-y0),0,0]); d.add(qr)
renderPDF.draw(d,c,67*mm,21.5*mm)
tracking(c,'MAIN OFFICE',5*mm,19*mm,'ArialBold',6,.65,orange)
tracking(c,'BRANCH OFFICE',47*mm,19*mm,'ArialBold',6,.65,orange)
for txt,y in [('Bole Medhanialem',15.5),('Milkomy City Complex',12.2),('3rd floor, Office 310',8.9)]:
 tracking(c,txt,5*mm,y*mm,'Arial',6.7,0,white)
for txt,y in [('Atsede Tesfa Building, 2A',15.5),('Addis Ababa, Ethiopia',12.2)]:
 tracking(c,txt,47*mm,y*mm,'Arial',6.7,0,white)
tracking(c,'+251 11 666 2914',5*mm,4.2*mm,'ArialBold',8.3,0,white)
tracking(c,'0116901090',47*mm,4.2*mm,'ArialBold',8.3,0,white)
c.showPage(); c.save()
r=PdfReader('output/pdf/Global_Plus_Abreha_Abera_Diagonal_Card.pdf')
assert len(r.pages)==1
text=r.pages[0].extract_text()
for required in ['Abreha Abera','GENERAL MANAGER','MAIN OFFICE','+251 11 666 2914','0116901090','globalplus.com.et']: assert required in text
print(text)
