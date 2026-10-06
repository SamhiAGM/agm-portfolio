"""Create an authentic one-page CV using only the supplied portfolio facts."""
import sys, pathlib, shutil
ROOT=pathlib.Path(__file__).resolve().parent.parent
sys.path.insert(0,str(ROOT/'.tools/python-deps'))
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.pagesizes import A4
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, KeepTogether, HRFlowable
from pypdf import PdfReader

out=ROOT/'output/pdf/Mohamed-Samhi-CV.pdf'
out.parent.mkdir(parents=True,exist_ok=True)
ink=colors.HexColor('#14213A'); muted=colors.HexColor('#45556E'); blue=colors.HexColor('#2862B5')
body=ParagraphStyle('body',fontName='Helvetica',fontSize=9,leading=13,textColor=muted,spaceAfter=7)
heading=ParagraphStyle('section',fontName='Helvetica-Bold',fontSize=10,leading=14,textColor=blue,spaceBefore=11,spaceAfter=7)
title=ParagraphStyle('name',fontName='Helvetica-Bold',fontSize=27,leading=32,textColor=ink,spaceAfter=5)
sub=ParagraphStyle('sub',fontName='Helvetica',fontSize=11,leading=16,textColor=muted,spaceAfter=9)
project=ParagraphStyle('project',fontName='Helvetica-Bold',fontSize=10,leading=14,textColor=ink,spaceAfter=3)
story=[]
def p(text,style=body): story.append(Paragraph(text,style))
p('Mohamed Samhi',title)
p('Computer Engineering Undergraduate | Full-Stack Developer',sub)
p('Kinniya, Sri Lanka  |  <link href="mailto:mohamedsamhi1207@gmail.com" color="#2862B5">mohamedsamhi1207@gmail.com</link>  |  0753999958')
p('<link href="https://github.com/SamhiAGM" color="#2862B5">github.com/SamhiAGM</link>  |  <link href="https://www.linkedin.com/in/mohamed-samhi-1387642a0" color="#2862B5">LinkedIn: Mohamed Samhi</link>')
story.append(HRFlowable(width='100%',thickness=.7,color=colors.HexColor('#CCD5E1'),spaceBefore=5,spaceAfter=6))
p('PROFILE',heading)
p('BSc. (Hons) Computer Engineering undergraduate at the University of Ruhuna, interested in full-stack software development, backend engineering, machine learning and DevOps. Building practical software projects that address healthcare, emergency response and citizen services. Open to software engineering internships and collaborations.')
p('EDUCATION',heading)
p('<b>University of Ruhuna, Sri Lanka</b> - BSc. (Hons) Computer Engineering (Undergraduate)')
p('Academic focus: software engineering, computer systems, machine learning, networking, DevOps, backend engineering and database systems.')
p('SELECTED PROJECTS',heading)
items=[
 ('LankaCare | Digital Healthcare Platform','Centralized ecosystem connecting citizens, hospitals, doctors and healthcare staff. Project scope includes patient portals, appointments, digital health records, prescriptions and role-based workflows.','Java, Spring Boot, Next.js, React, JWT','Lankacare'),
 ('ERCS | Emergency Resource Coordination','Two-member software engineering project for EC5207 DevOps Engineering. Supports incident monitoring, resource requests and allocation, response teams and operational dashboards.','React, TypeScript, Node.js, Express.js, PostgreSQL, Docker, GitHub Actions','ercs-emergency-resource-coordination-system'),
 ('GramaLink LK | Citizen & Government Services','Client-server coordination for citizens and administrative officers, with request tracking, live notifications, file transfer and role-based access.','Java, JavaFX, TCP socket programming, PostgreSQL','GramaLink-LK'),
 ('Personalized Glucose Forecasting | Machine Learning','Explores glucose prediction approximately 30 minutes ahead using CGMacros and ShanghaiT2DM data, preprocessing, time-series features, regression and validation.','Python, Pandas, NumPy, Scikit-learn','personalized-glucose-forecasting')]
for name,desc,stack,repo in items:
    story.append(KeepTogether([Paragraph(name,project),Paragraph(desc,body),Paragraph(f'<b>Focus / stack:</b> {stack} | <link href="https://github.com/SamhiAGM/{repo}" color="#2862B5">Repository</link>',body)]))
p('TECHNICAL TOOLKIT',heading)
p('<b>Backend:</b> Java, Spring Boot, Spring Data JPA, Hibernate, REST APIs, Maven<br/><b>Frontend:</b> React, Next.js, TypeScript, JavaScript, HTML, CSS, Tailwind CSS<br/><b>Data:</b> PostgreSQL, MySQL, Python, NumPy, Pandas, Scikit-learn<br/><b>Delivery & tools:</b> Git, GitHub, Docker, GitHub Actions, CI/CD, Linux, Postman, IntelliJ IDEA, VS Code, Figma')
p('MEMBERSHIP & ACTIVITIES',heading)
p('Institution of Engineers, Sri Lanka - IESL Student Member, <b>S-3388</b><br/>IEEE Xtreme - Participant | RedCypher Competition - Participant<br/>Collaborative software ecosystem: <link href="https://github.com/Gridora-Systems" color="#2862B5">Gridora Systems</link>')
doc=SimpleDocTemplate(str(out),pagesize=A4,rightMargin=42,leftMargin=42,topMargin=35,bottomMargin=32,title='Mohamed Samhi - Curriculum Vitae',author='Mohamed Samhi')
doc.build(story)
reader=PdfReader(out)
if len(reader.pages)!=1: raise RuntimeError(f'Expected one page, got {len(reader.pages)}')
assert 'S-3388' in reader.pages[0].extract_text()
dest=ROOT/'frontend/public/resume/Mohamed-Samhi-CV.pdf';dest.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(out,dest)
print('Created and text-validated a one-page CV.')
