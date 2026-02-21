#!/usr/bin/env python3
"""
Process feature images: remove white/light backgrounds and save as transparent PNGs.

Usage:
  1. Place your 4 JPEG images in public/images/raw/ with these exact names:
     - feature-voice.jpg
     - feature-contrast.jpg
     - feature-learning.jpg
     - feature-readiness.jpg

  2. Run: python3 scripts/process-feature-images.py

  Output will be saved to public/images/ as:
     - feature-voice.png
     - feature-contrast.png
     - feature-learning.png
     - feature-readiness.png
"""

import os
import sys
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    print("Error: Pillow is required. Install with: pip install Pillow")
    sys.exit(1)


def remove_background(input_path: str, output_path: str, fuzz: int = 40) -> None:
    """Remove white/light background from an image and save as transparent PNG."""
    img = Image.open(input_path).convert("RGBA")
    data = img.getdata()

    new_data = []
    for r, g, b, a in data:
        # Calculate how "white" this pixel is
        brightness = (r + g + b) / 3
        # Check if it's close to white (high brightness, low saturation)
        max_rgb = max(r, g, b)
        min_rgb = min(r, g, b)
        saturation = max_rgb - min_rgb

        if brightness > (255 - fuzz) and saturation < fuzz:
            # Make it fully transparent
            new_data.append((r, g, b, 0))
        elif brightness > (255 - fuzz * 2) and saturation < fuzz * 1.5:
            # Partially transparent for anti-aliasing at edges
            alpha = int(((255 - brightness) / (fuzz * 2)) * 255)
            new_data.append((r, g, b, min(255, max(0, alpha))))
        else:
            new_data.append((r, g, b, a))

    img.putdata(new_data)
    img.save(output_path, "PNG")
    print(f"  Processed: {input_path} -> {output_path}")


def main():
    project_root = Path(__file__).resolve().parent.parent
    raw_dir = project_root / "public" / "images" / "raw"
    output_dir = project_root / "public" / "images"

    files = [
        ("feature-voice.jpg", "feature-voice.png"),
        ("feature-contrast.jpg", "feature-contrast.png"),
        ("feature-learning.jpg", "feature-learning.png"),
        ("feature-readiness.jpg", "feature-readiness.png"),
    ]

    if not raw_dir.exists():
        raw_dir.mkdir(parents=True)
        print(f"Created directory: {raw_dir}")
        print()
        print("Please place your 4 JPEG images there with these names:")
        for src, _ in files:
            print(f"  - {src}")
        print()
        print("Then re-run this script.")
        sys.exit(0)

    found = 0
    for src_name, dst_name in files:
        src_path = raw_dir / src_name
        dst_path = output_dir / dst_name
        if src_path.exists():
            remove_background(str(src_path), str(dst_path))
            found += 1
        else:
            print(f"  Skipped (not found): {src_path}")

    if found == 0:
        print()
        print("No images found. Place JPEGs in:")
        print(f"  {raw_dir}/")
        sys.exit(1)

    print(f"\nDone! Processed {found} image(s).")


if __name__ == "__main__":
    main()
