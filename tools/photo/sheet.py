import sys,json,os,time,subprocess
from PIL import Image,ImageDraw
UA='EnchantedCompassSlides/1.0 (https://github.com/kjgrimes87-web/enchanted.compass)'
def dl(u,f):
    if os.path.exists(f) and os.path.getsize(f)>1000: return True
    r=subprocess.run(['curl','-s','-f','--max-time','40','-A',UA,'-o',f,u.split('?')[0]]); time.sleep(1)
    return r.returncode==0 and os.path.getsize(f)>1000
if __name__=='__main__':
  for tag in sys.argv[1:]:
    res=json.load(open(f'{tag}.json'))
    if not res: continue
    os.makedirs('t',exist_ok=True); ims=[]
    for i,x in enumerate(res):
        f=f't/{tag}{i}.jpg'
        if not dl(x['thumb'],f): print('skip',f); continue
        im=Image.open(f).convert('RGB'); im.thumbnail((400,400)); ims.append((f'{tag}{i}',im))
    W=4; cell=410; rows=(len(ims)+W-1)//W; S=Image.new('RGB',(W*cell,rows*(cell+20)),'white'); d=ImageDraw.Draw(S)
    for k,(n,im) in enumerate(ims):
        x=(k%W)*cell; y=(k//W)*(cell+20); S.paste(im,(x,y+20)); d.text((x+4,y+4),n,fill='black')
    S.save(f'sheet_{tag}.jpg',quality=80)
