"""Create a deployment-only ZIP. Never package Git metadata, tooling, tests or credentials."""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
root = Path(__file__).resolve().parents[1]
target = root/'dist/raqa-hostinger.zip'
target.parent.mkdir(exist_ok=True)
files = [root/name for name in ['index.php','products.php','gallery.php','about.php','contact.php','config.php','.htaccess','.user.ini','robots.txt','sitemap.xml']]
for folder in ['includes','data','assets']:
    files.extend(p for p in (root/folder).rglob('*') if p.is_file() and p.suffix.lower() in {'.php','.css','.js','.png','.webp','.mp4','.ttf','.woff2','.txt'})
with ZipFile(target,'w',ZIP_DEFLATED) as archive:
    for path in sorted(files): archive.write(path,path.relative_to(root).as_posix())
print(f'Packaged {len(files)} deployment files in {target.name}')
