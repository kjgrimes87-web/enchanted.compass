import sys,json,urllib.request,urllib.parse,re,time,os
UA={'User-Agent':'EnchantedCompassSlides/1.0 (https://github.com/kjgrimes87-web/enchanted.compass) python-urllib'}
def get(u):
    for k in range(6):
        try: return urllib.request.urlopen(urllib.request.Request(u,headers=UA),timeout=60).read()
        except urllib.error.HTTPError as e:
            if e.code==429: time.sleep(20+k*15); continue
            raise
    raise SystemExit('rate limited: '+u)
def search(q,n):
    u='https://commons.wikimedia.org/w/api.php?'+urllib.parse.urlencode(dict(format='json',action='query',generator='search',gsrsearch='filetype:bitmap '+q,gsrnamespace=6,gsrlimit=n,prop='imageinfo',iiprop='url|size|extmetadata',iiurlwidth=1600))
    r=json.loads(get(u)); out=[]
    for p in sorted(r.get('query',{}).get('pages',{}).values(),key=lambda x:x.get('index',0)):
        ii=p['imageinfo'][0]; m=ii.get('extmetadata',{})
        g=lambda k: re.sub('<[^>]+>','',m.get(k,{}).get('value','')).strip()
        out.append(dict(title=p['title'],w=ii['width'],h=ii['height'],lic=g('LicenseShortName'),artist=g('Artist')[:80],date=g('DateTimeOriginal')[:10],thumb=ii['thumburl'],page=ii['descriptionurl']))
    return out
if __name__=='__main__':
    tag=sys.argv[1]; q=sys.argv[2]; n=int(sys.argv[3]) if len(sys.argv)>3 else 8
    res=search(q,n); json.dump(res,open(f'{tag}.json','w'),indent=1)
    for i,x in enumerate(res): print(f"{tag}{i} {x['title'][5:][:60]} | {x['w']}x{x['h']} | {x['lic']} | {x['artist'][:40]} | {x['date']}")
