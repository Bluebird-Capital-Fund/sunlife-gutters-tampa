#!/usr/bin/env python3
"""
One-off: duplicate SunLife Gutters Tampa (SGT) into sibling folders with new brand + shortcode.
Run from anywhere; paths are absolute below.
"""
from __future__ import annotations

import os
import re
import shutil
import subprocess
import sys
from pathlib import Path

SOURCE = Path("/Users/joshua/Projects/Website Projects/SunLife Gutters Tampa (SGT)")
PROJECTS = Path("/Users/joshua/Projects/Website Projects")

VERTICALS = [
    {
        "folder": "North Texas Gutters (NTG)",
        "brand_full": "North Texas Gutters",
        "brand_website_folder": "North Texas Gutters Website",
        "slug_kebab": "north-texas-gutters",
        "domain": "northtexasgutters.com",
        "code": "NTG",
        "cookie_prefix": "ntg_",
    },
    {
        "folder": "Sterling Roofing (SR)",
        "brand_full": "Sterling Roofing",
        "brand_website_folder": "Sterling Roofing Website",
        "slug_kebab": "sterling-roofing",
        "domain": "sterlingroofing.com",
        "code": "SR",
        "cookie_prefix": "sr_",
    },
    {
        "folder": "Superior Gutter and Roofing (SGR)",
        "brand_full": "Superior Gutter and Roofing",
        "brand_website_folder": "Superior Gutter and Roofing Website",
        "slug_kebab": "superior-gutter-and-roofing",
        "domain": "superiorgutterandroofing.com",
        "code": "SGR",
        "cookie_prefix": "sgr_",
    },
]

RSYNC_EXCLUDES = [
    ".git",
    "node_modules",
    "astro-site/node_modules",
    "sanity-studio/node_modules",
    "astro-site/dist",
    "astro-site/.astro",
    "tmp-wayback-seamless.html",
    # Do not copy this one-off script into clones (would be corrupted by text replace).
    "scripts/duplicate-sgt-verticals.py",
]

TEXT_SUFFIXES = {
    ".astro",
    ".js",
    ".mjs",
    ".ts",
    ".tsx",
    ".md",
    ".json",
    ".css",
    ".txt",
    ".html",
    ".xml",
    ".svg",
    ".csv",
    ".yml",
    ".yaml",
    ".mdc",
    ".py",
    ".sh",
    ".toml",
    ".env",
    ".example",
}

SKIP_DIR_NAMES = {"node_modules", "dist", ".astro", ".git"}


def rsync_copy(dest: Path) -> None:
    if dest.exists():
        print(f"Removing existing {dest}", file=sys.stderr)
        shutil.rmtree(dest)
    dest.parent.mkdir(parents=True, exist_ok=True)
    cmd = ["rsync", "-a"]
    for x in RSYNC_EXCLUDES:
        cmd.extend(["--exclude", x])
    cmd.append(str(SOURCE) + "/")
    cmd.append(str(dest) + "/")
    print(" ".join(cmd))
    subprocess.run(cmd, check=True)


def rename_sgt_dirs(root: Path, new_code: str) -> None:
    """Depth-first: rename any path segment containing (SGT) to (NEW)."""
    old_tag = "(SGT)"
    new_tag = f"({new_code})"
    all_dirs: list[Path] = []
    for dirpath, dirnames, _ in os.walk(root, topdown=False):
        for name in dirnames:
            if old_tag in name:
                all_dirs.append(Path(dirpath) / name)
    all_dirs.sort(key=lambda p: len(p.parts), reverse=True)
    for old in all_dirs:
        new_name = old.name.replace(old_tag, new_tag)
        new_path = old.with_name(new_name)
        if new_path.exists():
            raise SystemExit(f"Target exists: {new_path}")
        print(f"rename dir {old} -> {new_path}")
        old.rename(new_path)


def rename_sgt_files(root: Path, new_code: str) -> None:
    """Rename files whose names contain (SGT), e.g. Reviews (SGT).md."""
    old_tag = "(SGT)"
    new_tag = f"({new_code})"
    for dirpath, _, filenames in os.walk(root):
        if any(p in SKIP_DIR_NAMES for p in Path(dirpath).parts):
            continue
        for fn in filenames:
            if old_tag not in fn:
                continue
            old = Path(dirpath) / fn
            new = Path(dirpath) / fn.replace(old_tag, new_tag)
            if new.exists():
                raise SystemExit(f"rename file target exists: {new}")
            print(f"rename file {old} -> {new}")
            old.rename(new)


def should_skip_file(path: Path) -> bool:
    parts = set(path.parts)
    if SKIP_DIR_NAMES & parts:
        return True
    if path.suffix.lower() not in TEXT_SUFFIXES:
        return True
    return False


def transform_file(path: Path, v: dict) -> None:
    if should_skip_file(path):
        return
    try:
        text = path.read_text(encoding="utf-8")
    except (UnicodeDecodeError, OSError):
        return
    orig = text
    code = v["code"]
    brand = v["brand_full"]
    slug = v["slug_kebab"]
    domain = v["domain"]
    cookie = v["cookie_prefix"]
    brand_site = v["brand_website_folder"]

    pairs: list[tuple[str, str]] = [
        ("SunLife Gutters Tampa", brand),
        ("SunLife Gutters Website", brand_site),
        (
            "SunLife Gutters 1502 Lenna Ave Seffner FL 33584",
            f"{brand} — set GOOGLE_PLACES_TEXT_QUERY env or edit this script with your Maps address",
        ),
        ("www.sunlifegutterstampa.com", f"www.{domain}"),
        ("sunlifegutterstampa.com", domain),
        ("https://sunlifegutters.com", f"https://www.{domain}"),
        ("sunlifegutters.com", domain),
        ("SGT-Lead-Form", f"{code}-Lead-Form"),
        ("sgt_", cookie),
        ("Media%20(SGT)", f"Media%20({code})"),
        ("Reviews%20(SGT)", f"Reviews%20({code})"),
        ("(SGT)", f"({code})"),
    ]
    for a, b in pairs:
        text = text.replace(a, b)
    text = re.sub(r"\bSGT\b", code, text)

    # SMS consent: drop old legal entity name from source site
    text = re.sub(
        r"I consent to SMS from (.+?) \(Bluebird Miami, LLC\) at my number\.",
        r"I consent to SMS from \1 at my number.",
        text,
    )

    if text != orig:
        path.write_text(text, encoding="utf-8")


def rename_brand_docs_folder(dest: Path, brand_website_folder: str) -> None:
    """Physical folder was copied as `SunLife Gutters Website`; match CMS path text."""
    old = dest / "SunLife Gutters Website"
    new = dest / brand_website_folder
    if old.is_dir() and not new.exists():
        print(f"rename dir {old} -> {new}")
        old.rename(new)


def patch_sanity_studio_package_slug(dest: Path, slug: str) -> None:
    """sanity-studio/package.json `name` stays on the source slug until patched."""
    p = dest / "sanity-studio" / "package.json"
    if not p.is_file():
        return
    text = p.read_text(encoding="utf-8")
    text2 = text.replace('"sunlife-gutters-tampa"', f'"{slug}"')
    if text2 != text:
        p.write_text(text2, encoding="utf-8")


def walk_and_transform(root: Path, v: dict) -> None:
    for dirpath, _, filenames in os.walk(root):
        dp = Path(dirpath)
        if any(p in SKIP_DIR_NAMES for p in dp.parts):
            continue
        for fn in filenames:
            transform_file(dp / fn, v)


def write_setup_readme(dest: Path, v: dict) -> None:
    readme = dest / "SETUP_AFTER_DUPLICATE.md"
    readme.write_text(
        f"""# Setup checklist — {v["brand_full"]} ({v["code"]})

This folder was duplicated from **SunLife Gutters Tampa (SGT)** and rebranded.

## Must change before production

1. **Sanity CMS** — `astro-site/src/lib/sanity.js` and `sanity-studio/sanity.config.ts` still use the **source** `projectId` / `dataset`. Create a **new** Sanity project (or dataset) for this brand and update both files, plus any `SANITY_*` env vars on Vercel.
2. **Domain** — Replace placeholder **`{v["domain"]}`** in `vercel.json`, `astro-site/public/robots.txt`, and anywhere else you find it with the real hostname.
3. **Secrets** — New Vercel project: `RECAPTCHA_*`, `ZAPIER_WEBHOOK_URL`, `PUBLIC_MAPBOX_TOKEN`, Lead Connector widget id, CallRail, GTM, etc.
4. **Content** — Tampa-specific copy, locations, and images remain as templates; edit in Sanity or in-repo pages.
5. **Dependencies** — From repo root: `cd astro-site && npm install` and `cd sanity-studio && npm install` (node_modules were not copied).
6. **Git** — `git init` was run with an initial commit; add your remote: `git remote add origin <url>`.

Shortcode for asset paths: **({v["code"]})** (e.g. `Media ({v["code"]})/`).
""",
        encoding="utf-8",
    )


def git_init(dest: Path, v: dict) -> None:
    env = os.environ.copy()
    env.setdefault("GIT_AUTHOR_NAME", "Site duplicate script")
    env.setdefault("GIT_AUTHOR_EMAIL", "duplicate@local.invalid")
    env.setdefault("GIT_COMMITTER_NAME", env["GIT_AUTHOR_NAME"])
    env.setdefault("GIT_COMMITTER_EMAIL", env["GIT_AUTHOR_EMAIL"])
    subprocess.run(["git", "init"], cwd=dest, check=True, capture_output=True)
    subprocess.run(["git", "add", "-A"], cwd=dest, check=True)
    subprocess.run(
        ["git", "commit", "-m", f"Initial duplicate from SGT as {v['brand_full']} ({v['code']})"],
        cwd=dest,
        check=True,
        env=env,
        capture_output=True,
    )


def main() -> None:
    if not SOURCE.is_dir():
        print(f"Missing source: {SOURCE}", file=sys.stderr)
        sys.exit(1)
    for v in VERTICALS:
        dest = PROJECTS / v["folder"]
        print(f"\n=== {dest} ===")
        rsync_copy(dest)
        rename_sgt_dirs(dest, v["code"])
        rename_sgt_files(dest, v["code"])
        walk_and_transform(dest, v)
        rename_brand_docs_folder(dest, v["brand_website_folder"])
        patch_sanity_studio_package_slug(dest, v["slug_kebab"])
        write_setup_readme(dest, v)
        git_init(dest, v)
        print(f"Done: {dest}")


if __name__ == "__main__":
    main()
