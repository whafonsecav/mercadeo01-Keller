"""Recorta los bordes transparentes de las imágenes de producto para que todas
queden alineadas y del mismo tamaño visual en la presentación.

Uso (desde esta carpeta):  python recortar_imagenes.py
Procesa assets/img/*.webp|png y assets/img/productos/*.png (no toca logos).
"""
from pathlib import Path
from PIL import Image

BASE = Path(__file__).parent / "assets" / "img"
SKIP = {"colombina_logo", "politecnico-w", "politecnico-b"}
MAX = 1000  # lado máximo en píxeles

for f in sorted(list(BASE.glob("*.webp")) + list(BASE.glob("*.png")) + list((BASE / "productos").glob("*.png"))):
    if f.stem in SKIP:
        continue
    im = Image.open(f).convert("RGBA")
    box = im.getchannel("A").point(lambda a: 255 if a > 12 else 0).getbbox()
    if not box:
        continue
    w, h = box[2] - box[0], box[3] - box[1]
    pad = round(max(w, h) * 0.02)
    box = (max(0, box[0] - pad), max(0, box[1] - pad), min(im.width, box[2] + pad), min(im.height, box[3] + pad))
    out = im.crop(box)
    out.thumbnail((MAX, MAX), Image.LANCZOS)
    if out.size == im.size:
        print(f"ok (ya recortada)  {f.name}")
        continue
    if f.suffix == ".webp":
        out.save(f, "WEBP", quality=90, method=6)
    else:
        out.save(f, "PNG", optimize=True)
    print(f"recortada  {f.name}: {im.size} -> {out.size}")
