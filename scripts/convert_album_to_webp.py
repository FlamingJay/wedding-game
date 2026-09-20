#!/usr/bin/env python3
"""Convert wedding album JPG/JPEG assets to WebP.

Original files are kept by default. Use --remove-originals only after verifying
that the generated WebP files load correctly in the deployed site.
"""

from __future__ import annotations

import argparse
import subprocess
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
ALBUM_DIRS = (ROOT / "frontend/assets/album/full", ROOT / "frontend/assets/album/thumbs")
SOURCE_EXTENSIONS = {".jpg", ".jpeg"}


def convert_image(source: Path, quality: int, method: int, overwrite: bool) -> Path:
    target = source.with_suffix(".webp")
    if target.exists() and not overwrite:
        print(f"skip  {target.relative_to(ROOT)}")
        return target

    command = [
        "cwebp",
        "-quiet",
        "-q",
        str(quality),
        "-m",
        str(method),
        str(source),
        "-o",
        str(target),
    ]
    subprocess.run(command, check=True)
    print(f"write {target.relative_to(ROOT)}")
    return target


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--quality", type=int, default=82, help="WebP quality, 0-100 (default: 82)")
    parser.add_argument("--method", type=int, default=6, choices=range(0, 7), help="cwebp compression method, 0-6 (default: 6)")
    parser.add_argument("--overwrite", action="store_true", help="overwrite existing WebP files")
    parser.add_argument("--remove-originals", action="store_true", help="remove source JPG/JPEG files after conversion")
    args = parser.parse_args()

    if not 0 <= args.quality <= 100:
        parser.error("--quality must be between 0 and 100")

    sources = sorted(
        source
        for directory in ALBUM_DIRS
        for source in directory.iterdir()
        if source.is_file() and source.suffix.lower() in SOURCE_EXTENSIONS
    )
    if not sources:
        print("No JPG/JPEG album files found.")
        return

    converted = [convert_image(source, args.quality, args.method, args.overwrite) for source in sources]

    if args.remove_originals:
        for source in sources:
            source.unlink()
            print(f"remove {source.relative_to(ROOT)}")

    print(f"Converted {len(converted)} album image(s) to WebP.")


if __name__ == "__main__":
    main()
