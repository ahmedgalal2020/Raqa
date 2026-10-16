from pathlib import Path
import subprocess, os, shutil
root=Path(__file__).resolve().parents[1]
out=root/'tests/results/rendered'
out.mkdir(parents=True,exist_ok=True)
php=os.environ.get('PHP_BINARY') or shutil.which('php') or str(root/'.tools/php/php.exe')
for page in ['index','products','gallery','about','contact']:
    result=subprocess.run([php,'-r',f'$_SERVER["SCRIPT_NAME"]="/{page}.php"; include "{page}.php";'],cwd=root,capture_output=True,check=True)
    html=result.stdout.decode('utf-8')
    assert '</html>' in html
    html=html.replace('<head>','<head><base href="'+root.as_uri()+'/">')
    (out/f'{page}.html').write_text(html,encoding='utf-8')
    print('Rendered',page)
