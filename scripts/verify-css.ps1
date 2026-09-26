# verify-css.ps1 - ground truth for "is Tailwind actually reaching the browser?"
# Catches BUG-051 (stale Vite dev server silently serving CSS without Tailwind).
# Usage: powershell -File scripts/verify-css.ps1 [-Port 11977]
param([int]$Port = 0)

$ErrorActionPreference = "Stop"

if ($Port -eq 0) {
    $cfg = Join-Path (Split-Path -Parent $PSScriptRoot) "fleet-start.config.ps1"
    if (Test-Path -LiteralPath $cfg) {
        $m = Select-String -Path $cfg -Pattern "FrontendPort\s*=\s*(\d+)" | Select-Object -First 1
        if ($m) { $Port = [int]$m.Matches[0].Groups[1].Value }
    }
    if ($Port -eq 0) { $Port = 11977 }
}

$url = "http://127.0.0.1:$Port/src/index.css"
try {
    $resp = Invoke-WebRequest -Uri $url -TimeoutSec 10 -UseBasicParsing
} catch {
    Write-Host "FAIL: dev server not reachable at $url" -ForegroundColor Red
    Write-Host "  Run .\\start.ps1 first, then retry 'just verify-css'." -ForegroundColor Yellow
    exit 1
}

$css = [string]$resp.Content
$hasPreflight = $css -match "box-sizing"
$hasUtilities = ($css -match "\.bg-zinc-950") -or ($css -match "\.text-amber-400")

if ($css.Length -lt 5000 -or -not $hasPreflight -or -not $hasUtilities) {
    Write-Host "FAIL: Tailwind is NOT processing ($($css.Length) bytes served, preflight=$hasPreflight)." -ForegroundColor Red
    Write-Host "  Cause: stale Vite dev server predating the Tailwind setup (see BUG-051)." -ForegroundColor Yellow
    Write-Host "  Fix: restart the frontend (re-run .\\start.ps1), then retry." -ForegroundColor Yellow
    exit 1
}

Write-Host "OK: Tailwind live ($($css.Length) bytes, preflight + utilities present) on :$Port." -ForegroundColor Green
