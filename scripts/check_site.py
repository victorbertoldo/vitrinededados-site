#!/usr/bin/env python3
"""Static checks for the Vitridata site (no dependencies).

Usage: python3 scripts/check_site.py site

Checks every HTML page for: broken internal links, assets and #anchors;
hreflang pairs that point to existing pages; matching <html lang>;
present and unique <title> and meta description; one <h1>.
"""
import os
import sys
from html.parser import HTMLParser
from urllib.parse import urlparse

DOMAIN = "vitrinededados.com"


class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links, self.ids, self.alternates = [], set(), {}
        self.lang = self.title = self.desc = None
        self.h1 = 0
        self._in_title = False

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if "id" in a:
            self.ids.add(a["id"])
        if tag == "html":
            self.lang = a.get("lang")
        elif tag == "title":
            self._in_title = True
            self.title = ""
        elif tag == "h1":
            self.h1 += 1
        elif tag == "meta" and a.get("name") == "description":
            self.desc = a.get("content")
        elif tag == "link" and a.get("rel") == "alternate" and a.get("hreflang"):
            self.alternates[a["hreflang"]] = a["href"]
        for attr in ("href", "src"):
            if attr in a and tag != "link" or (tag == "link" and attr == "href" and a.get("rel") in ("stylesheet", "icon", "apple-touch-icon", "preload")):
                if attr in a:
                    self.links.append(a[attr])

    def handle_endtag(self, tag):
        if tag == "title":
            self._in_title = False

    def handle_data(self, data):
        if self._in_title:
            self.title += data


def resolve(root, page_rel, href):
    u = urlparse(href)
    if u.scheme in ("mailto", "tel", "javascript") or (u.scheme in ("http", "https") and u.netloc not in (DOMAIN, "www." + DOMAIN)):
        return None, None
    path = u.path or "/" + page_rel
    if not path.startswith("/"):
        path = os.path.normpath(os.path.join("/" + os.path.dirname(page_rel), path))
    fs = os.path.join(root, path.lstrip("/"))
    if path.endswith("/") or os.path.isdir(fs):
        fs = os.path.join(fs, "index.html")
    return fs, u.fragment


def main(root):
    pages = {}
    for d, _, files in os.walk(root):
        for f in files:
            if f.endswith(".html"):
                rel = os.path.relpath(os.path.join(d, f), root)
                p = Page()
                p.feed(open(os.path.join(d, f), encoding="utf-8").read())
                pages[rel] = p
    errors = []
    titles, descs = {}, {}
    for rel, p in sorted(pages.items()):
        for href in p.links:
            fs, frag = resolve(root, rel, href)
            if fs is None:
                continue
            if not os.path.exists(fs):
                errors.append(f"{rel}: broken link {href}")
            elif frag:
                target = pages.get(os.path.relpath(fs, root))
                if target and frag not in target.ids:
                    errors.append(f"{rel}: missing anchor {href}")
        if rel == "404.html":
            continue
        if p.h1 != 1:
            errors.append(f"{rel}: expected one <h1>, found {p.h1}")
        if not p.title or not p.desc:
            errors.append(f"{rel}: missing title or description")
        expected = "pt-BR" if rel.startswith("pt-br/") else "en-US"
        if p.lang != expected:
            errors.append(f"{rel}: html lang is {p.lang}, expected {expected}")
        for hl in ("en-US", "pt-BR", "x-default"):
            if hl not in p.alternates:
                errors.append(f"{rel}: missing hreflang {hl}")
            else:
                fs, _ = resolve(root, rel, p.alternates[hl])
                if fs and not os.path.exists(fs):
                    errors.append(f"{rel}: hreflang {hl} points to missing page")
        if rel != "index.html":
            titles.setdefault(p.title, []).append(rel)
            descs.setdefault(p.desc, []).append(rel)
    for kind, seen in (("title", titles), ("description", descs)):
        for v, rels in seen.items():
            if len(rels) > 1:
                errors.append(f"duplicate {kind} on {', '.join(rels)}")
    for e in errors:
        print("ERROR", e)
    print(f"Checked {len(pages)} pages: {len(errors)} problem(s).")
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1] if len(sys.argv) > 1 else "site"))
