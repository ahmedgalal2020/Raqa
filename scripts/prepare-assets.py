"""Copy original RAQA assets and generate responsive WebP derivatives with Pillow."""
from pathlib import Path
from PIL import Image
import shutil

ROOT = Path(__file__).resolve().parents[1]
SOURCE = Path(r'C:\Users\galal\Downloads\RAQA')
mapping = {'1.1.png':'signboard.png','1.2.png':'beverage-station.png','1.3.png':'serving-cart.png'}
def prepare(source, target):
    target.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(source, target)
    with Image.open(source) as original:
        image = original.convert('RGB')
        image.save(target.with_suffix('.webp'), 'WEBP', quality=85, method=6)
        image.thumbnail((640, 10000))
        image.save(target.with_name(target.stem+'-640.webp'), 'WEBP', quality=82, method=6)
for old, new in mapping.items():
    prepare(SOURCE/'صور للركنة'/old, ROOT/'assets/images/products'/new)
for number in range(1,8):
    prepare(SOURCE/'صور للركنة'/f'{number}.png', ROOT/'assets/images/gallery'/f'event-{number}.png')
brand = ROOT/'assets/images/branding'
brand.mkdir(parents=True,exist_ok=True)
shutil.copy2(SOURCE/'logo/Untitled design (1).png',brand/'raqa-logo.png')
print('Copied 11 original images and created 20 responsive WebP images.')
