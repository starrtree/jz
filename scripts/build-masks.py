"""Source-preserving SVG silhouettes. No original pixel or file is changed.

Only near-white pixels connected to an image border are background candidates.
The resulting SVG mask is used with the untouched JPEG in CSS. Interior white
areas remain opaque. This is an extraction, not generative retouching.
"""
from pathlib import Path
from collections import deque
import json, hashlib
import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'assets/masks'
OUT.mkdir(parents=True, exist_ok=True)
records = []
for name in ['centipede-arm', 'lilies-arm', 'stars-foot', 'branching-neck-shoulder', 'snake-sword-floral-back']:
    source = ROOT / f'media/cutout-candidates/{name}.jpeg'
    rgb = np.asarray(Image.open(source).convert('RGB'))
    h,w = rgb.shape[:2]
    white = rgb.min(axis=2) >= 246
    outside = np.zeros((h,w), dtype=bool)
    queue = deque()
    for x in range(w):
        for y in (0,h-1):
            if white[y,x] and not outside[y,x]: outside[y,x]=True; queue.append((y,x))
    for y in range(h):
        for x in (0,w-1):
            if white[y,x] and not outside[y,x]: outside[y,x]=True; queue.append((y,x))
    while queue:
        y,x = queue.popleft()
        for yy,xx in ((y-1,x),(y+1,x),(y,x-1),(y,x+1)):
            if 0<=yy<h and 0<=xx<w and white[yy,xx] and not outside[yy,xx]:
                outside[yy,xx]=True;queue.append((yy,xx))
    # Exact scanline geometry: no downsampling, erosion, or interior color keying.
    segments=[]
    for y in range(h):
        row=np.r_[False,~outside[y],False].astype(np.int8)
        starts=np.where(np.diff(row)==1)[0]; ends=np.where(np.diff(row)==-1)[0]
        for a,b in zip(starts,ends): segments.append(f'M{a} {y}h{b-a}v1H{a}z')
    (OUT/f'{name}.svg').write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}"><path fill="white" d="{"".join(segments)}"/></svg>')
    records.append({'source':str(source.relative_to(ROOT)), 'sha256':hashlib.sha256(source.read_bytes()).hexdigest(),'mask':f'assets/masks/{name}.svg','width':w,'height':h,'method':'border-connected near-white silhouette; unchanged source JPEG rendered beneath SVG alpha mask'})
(OUT/'provenance.json').write_text(json.dumps(records,indent=2)+'\n')
print(f'Created {len(records)} source-preserving SVG masks')
