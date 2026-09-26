# Honest end-to-end: boot the REAL server, hit REAL endpoints, fail loudly.
$ErrorActionPreference = "Stop"
$backendProc = Start-Process uv -ArgumentList "run", "python", "-m", "bl_halo_mcp.run_server", "--serve", "--port", "11988" -PassThru
try {
    $healthy = $false
    for ($i = 0; $i -lt 24; $i++) {
        Start-Sleep -Seconds 5
        try {
            $h = Invoke-RestMethod -Uri "http://127.0.0.1:11988/api/health" -TimeoutSec 3
            if ($h.ok -eq $true) { $healthy = $true; break }
        } catch {}
    }
    if (-not $healthy) { throw "e2e: backend never healthy" }
    $p = Invoke-RestMethod -Uri "http://127.0.0.1:11988/api/photos?limit=1" -TimeoutSec 5
    if ($null -eq $p.has_more) { throw "e2e: photos contract broken" }
    Write-Output "e2e OK"
} finally {
    Stop-Process -Id $backendProc.Id -Force -ErrorAction SilentlyContinue
}
