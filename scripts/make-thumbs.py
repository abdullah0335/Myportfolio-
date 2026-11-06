"""Create 640px-wide list thumbnails (<slug>-thumb.jpg) from each <slug>-hero.jpg,
or from <slug>-cover.jpg when a project has one (a hand-picked 16:10 crop).

Run from the project root after capturing new screenshots:
    python scripts/make-thumbs.py && node scripts/build-shots.mjs
"""
from pathlib import Path

from PIL import Image

WORK = Path(__file__).resolve().parent.parent / "public" / "work"
WIDTH = 640

for hero in sorted(WORK.glob("*-hero.jpg")):
    thumb = hero.with_name(hero.name.replace("-hero.jpg", "-thumb.jpg"))
    cover = hero.with_name(hero.name.replace("-hero.jpg", "-cover.jpg"))
    source = cover if cover.exists() else hero
    with Image.open(source) as im:
        h = round(im.height * WIDTH / im.width)
        im.convert("RGB").resize((WIDTH, h), Image.LANCZOS).save(
            thumb, "JPEG", quality=80, optimize=True, progressive=True
        )
    print(f"{thumb.name}: {WIDTH}x{h}")
