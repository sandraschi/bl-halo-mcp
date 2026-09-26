set windows-shell := ["powershell.exe", "-NoProfile", "-Command"]

serve:
    uv sync --extra dev
    uv run python -m bl_halo_mcp.api

test:
    uv run pytest -q

lint:
    uv run ruff check .
    uv run ruff format --check .

fmt:
    uv run ruff check --fix .
    uv run ruff format .

mcpb-pack:
    uv run python scripts/pack_mcpb.py

ci:
    uv run ruff check .
    uv run ruff format --check .
    uv run pytest -q

e2e:
    echo "e2e: start backend then run webapp smoke (see docs/DEVELOPMENT.md)"
