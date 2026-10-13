"""Static integrity checks; not a substitute for browser QA."""
from pathlib import Path
from html.parser import HTMLParser
import re
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = []
        self.refs = []
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if 'id' in attrs:
            self.ids.append(attrs['id'])
        for key in ('src', 'href'):
            if attrs.get(key):
                self.refs.append(attrs[key])

page = Page()
page.feed((ROOT / 'index.html').read_text())
assert len(page.ids) == len(set(page.ids)), 'Duplicate HTML IDs'
for ref in page.refs:
    if ref.startswith('#'):
        assert ref == '#' or ref[1:] in page.ids, f'Missing anchor: {ref}'
    elif not re.match(r'[a-z]+:', ref):
        assert (ROOT / ref).is_file(), f'Missing file: {ref}'
js = (ROOT / 'app.js').read_text()
for ref in re.findall(r"file:'([^']+)'", js):
    assert (ROOT / ref).is_file(), f'Missing gallery image: {ref}'
for target in re.findall(r"querySelector\('#([^']+)'\)", js):
    assert target in page.ids, f'Missing JS target: {target}'
for svg in (ROOT / 'assets').glob('*.svg'):
    ET.parse(svg)
assert 'prefers-reduced-motion' in (ROOT / 'styles.css').read_text()
print('PASS: IDs, anchors, local assets, gallery images, JS targets, SVG XML, reduced-motion rule')
