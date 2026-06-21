#!/usr/bin/env python3
"""Rebuild manifest.json from Markdown notes."""

from __future__ import annotations

import json
from pathlib import Path


ROOT = Path(__file__).resolve().parent
NOTES = ROOT / "notes"
MANIFEST = ROOT / "manifest.json"


def has_front_matter(path: Path) -> bool:
    text = path.read_text(encoding="utf-8")
    if not text.startswith("---\n"):
        return False
    end = text.find("\n---", 4)
    if end == -1:
        return False
    front_matter = text[4:end]
    return "supplement:" in front_matter and "title:" in front_matter


def main() -> None:
    notes = []
    for path in sorted(NOTES.glob("*.md")):
        if path.name.startswith((".", "_")):
            continue
        if has_front_matter(path):
            notes.append({"path": f"notes/{path.name}"})

    data = {"schemaVersion": 1, "notes": notes}
    next_text = json.dumps(data, ensure_ascii=False, indent=2) + "\n"
    if MANIFEST.exists() and MANIFEST.read_text(encoding="utf-8") == next_text:
        return
    MANIFEST.write_text(next_text, encoding="utf-8")


if __name__ == "__main__":
    main()
