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
c=canvas.Canvas('output/pdf/Global_Plus_Abreha_Abera_Business_Card.pdf',pagesize=(W,H))
c.setTitle('Global Plus - Abreha Abera - General Manager')
c.setAuthor('Global Plus Business Group One Member PLC')
c.setFillColor(white); c.rect(0,0,W,H,fill=1,stroke=0)
c.drawImage(logo,5*mm,39.3*mm,width=16*mm,height=12.85*mm,mask='auto')
tracking(c,'GLOBAL PLUS',24*mm,47.5*mm,'Garamond',16,.5,navy)
tracking(c,'BUSINESS GROUP',24*mm,43.5*mm,'Arial',6.8,1.1,navy)
tracking(c,'ONE MEMBER PLC',24*mm,40*mm,'Arial',5.7,.85,navy)
c.setFillColor(navy); c.rect(0,0,W,36.8*mm,fill=1,stroke=0)
c.setFillColor(orange); c.rect(0,36.8*mm,W,.6*mm,fill=1,stroke=0)
tracking(c,'Abreha Abera',5*mm,31.5*mm,'ArialBold',12,0,white)
tracking(c,'GENERAL MANAGER',5*mm,27.4*mm,'Arial',6.1,.7,orange)
tracking(c,'globalplus.com.et',5*mm,23.4*mm,'Arial',7,0,white)
c.linkURL('https://globalplus.com.et',(5*mm,22.5*mm,33*mm,26*mm),relative=0,thickness=0)
qr=QrCodeWidget('https://globalplus.com.et',barLevel='M',barBorder=4)
qr.barFillColor=navy
x0,y0,x1,y1=qr.getBounds(); qsize=18*mm
c.setFillColor(white); c.rect(67*mm,22*mm,qsize,qsize,fill=1,stroke=0)
d=Drawing(qsize,qsize,transform=[qsize/(x1-x0),0,0,qsize/(y1-y0),0,0]); d.add(qr)
renderPDF.draw(d,c,67*mm,22*mm)
tracking(c,'MAIN OFFICE',5*mm,19*mm,'ArialBold',6,.65,orange)
tracking(c,'BRANCH OFFICE',47*mm,19*mm,'ArialBold',6,.65,orange)
for txt,y in [('Bole Medhanialem',15.5),('Milkomy City Complex',12.2),('3rd floor, Office 310',8.9)]:
 tracking(c,txt,5*mm,y*mm,'Arial',6.7,0,white)
for txt,y in [('Atsede Tesfa Building, 2A',15.5),('Addis Ababa, Ethiopia',12.2)]:
 tracking(c,txt,47*mm,y*mm,'Arial',6.7,0,white)
tracking(c,'+251 11 666 2914',5*mm,4.2*mm,'ArialBold',8.3,0,white)
tracking(c,'0116901090',47*mm,4.2*mm,'ArialBold',8.3,0,white)
c.showPage(); c.save()
r=PdfReader('output/pdf/Global_Plus_Abreha_Abera_Business_Card.pdf')
assert len(r.pages)==1
text=r.pages[0].extract_text()
for required in ['Abreha Abera','GENERAL MANAGER','MAIN OFFICE','+251 11 666 2914','0116901090','globalplus.com.et']: assert required in text
print(text)
