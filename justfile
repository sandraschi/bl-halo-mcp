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

mcpb-pack:
	uv run python scripts/pack_mcpb.py

ci:
	uv run ruff check .
	uv run ruff format --check .
	uv run pyright src/
	uv run pytest -q

e2e:
	uv run pytest -q
	powershell -NoProfile -Command "$backendProc = Start-Process uv -ArgumentList 'run','python','-m','bl_halo_mcp.run_server','--serve','--port','11988' -PassThru; try { $healthy = $false; for ($i=0; $i -lt 24; $i++) { Start-Sleep -Seconds 5; try { $h = Invoke-RestMethod -Uri 'http://127.0.0.1:11988/api/health' -TimeoutSec 3; if ($h.ok -eq $true) { $healthy = $true; break } } catch {} }; if (-not $healthy) { throw 'e2e: backend never healthy' }; $p = Invoke-RestMethod -Uri 'http://127.0.0.1:11988/api/photos?limit=1' -TimeoutSec 5; if ($null -eq $p.has_more) { throw 'e2e: photos contract broken' }; Write-Output 'e2e OK' } finally { Stop-Process -Id $backendProc.Id -Force -ErrorAction SilentlyContinue }"
