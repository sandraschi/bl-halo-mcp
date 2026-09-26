"""MCPB pack - wipe+recopy src/ -> mcpb/src/, verify 3-4-100 prompts."""

from __future__ import annotations

import json
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "src"
STAGE = ROOT / "mcpb" / "src"
PROMPTS = ROOT / "assets" / "prompts"


def words(p: Path) -> int:
    return len(p.read_text(encoding="utf-8").split())


def main() -> int:
    sys_ok = (PROMPTS / "system.md").exists()
    usr_ok = (PROMPTS / "user.md").exists()
    ex_ok = (PROMPTS / "examples.json").exists()
    if not (sys_ok and usr_ok and ex_ok):
        print("ERROR: assets/prompts missing system.md/user.md/examples.json")
        return 1
    sw, uw = words(PROMPTS / "system.md"), words(PROMPTS / "user.md")
    ex = json.loads((PROMPTS / "examples.json").read_text(encoding="utf-8"))
    print(f"prompts: system={sw} user={uw} examples={len(ex)}")
    if sw < 3000 or uw < 4000 or len(ex) < 100:
        print("ERROR: 3-4-100 gate failed (need system>=3000, user>=4000, examples>=100)")
        return 1
    if STAGE.exists():
        shutil.rmtree(STAGE)
    shutil.copytree(SRC, STAGE)
    print(f"staged {SRC} -> {STAGE}. Run: mcpb pack")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
