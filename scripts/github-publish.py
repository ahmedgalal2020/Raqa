"""Create the requested private repository and push using existing Git credentials.
No credentials are printed or written to disk. Requires an authenticated Git credential manager.
"""
import json, os, subprocess, urllib.request, urllib.error
env = dict(os.environ, GIT_TERMINAL_PROMPT='0', GCM_INTERACTIVE='never')
credentials = subprocess.run(['git','credential','fill'],input='protocol=https\nhost=github.com\n\n',text=True,capture_output=True,env=env)
fields = dict(line.split('=',1) for line in credentials.stdout.splitlines() if '=' in line)
token = fields.get('password')
if not token:
    raise SystemExit('No existing GitHub Git credential is available. Sign in to GitHub for Git, then rerun.')
def api(path, data=None):
    request = urllib.request.Request('https://api.github.com'+path, data=json.dumps(data).encode() if data else None, headers={'Authorization':'Bearer '+token,'Accept':'application/vnd.github+json','User-Agent':'RAQA-publisher','X-GitHub-Api-Version':'2022-11-28'})
    with urllib.request.urlopen(request, timeout=30) as response: return json.load(response)
try:
    user = api('/user')['login']
    if user.lower() != 'ahmedgalal2020': raise SystemExit('Git authentication belongs to a different account; stopped before creating anything.')
    try:
        repo=api('/repos/'+user+'/Raqa')
        # The owner explicitly approved this public repository.
    except urllib.error.HTTPError as error:
        if error.code != 404: raise
        repo=api('/user/repos',{'name':'Raqa','private':True,'description':'RAQA | رِقّة — Arabic luxury hospitality website','auto_init':False})
    remote=repo['clone_url']
    current=subprocess.run(['git','remote','get-url','origin'],capture_output=True,text=True)
    if current.returncode==0 and current.stdout.strip()!=remote: raise SystemExit('Origin differs from intended repository; stopped without changing it.')
    if current.returncode!=0: subprocess.run(['git','remote','add','origin',remote],check=True)
    subprocess.run(['git','push','-u','origin','HEAD:main'],env=env,check=True)
    verified=api('/repos/'+user+'/Raqa')
    print(json.dumps({'url':verified['html_url'],'private':verified['private'],'branch':'main'}))
except urllib.error.HTTPError as error:
    raise SystemExit('GitHub API returned HTTP '+str(error.code)+'. No credential details logged.')
