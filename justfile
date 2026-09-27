set windows-shell := ["powershell.exe", "-NoProfile", "-Command"]

serve:
	uv sync --extra dev
	uv run python -m bl_halo_mcp.run_server --serve

test:
	uv run pytest -q

lint:
	uv run ruff check .
	uv run ruff format --check .
	uv run pyright src/

fmt:
	uv run ruff check --fix .
	uv run ruff format .

bootstrap:
	uv sync --extra dev
	pre-commit install
	powershell.exe -NoProfile -Command "Set-Location '{{justfile_directory()}}/web_sota'; bun install --frozen-lockfile"

mcpb-pack:
	uv run python scripts/pack_mcpb.py

ci:
	uv run ruff check .
	uv run ruff format --check .
	uv run pyright src/
	uv run pytest -q

e2e:
	uv run pytest -q
	powershell -NoProfile -ExecutionPolicy Bypass -File scripts/e2e.ps1

verify-css:
	powershell -NoProfile -ExecutionPolicy Bypass -File scripts/verify-css.ps1
