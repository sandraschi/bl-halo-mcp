# Per-repo fleet start config for bl-halo-mcp
# Ports allocated 2026-09-26: backend 11976, frontend 11977.
# Registered in operations/WEBAPP_PORTS.md. Do not hand-edit - re-run claim_ports.py on collision.
@{
    Name         = 'bl-halo-mcp'
    BackendPort  = 11976
    FrontendPort = 11977
    HealthPath   = '/api/health'
    WebRoot      = 'web_sota'
    Backend = @{
        Kind          = 'uvicorn'
        UvicornTarget = 'bl_halo_mcp.api:app'
        SyncExtras    = @('dev')
        Env           = @{ WEB_PORT = '11976' }
    }
    Frontend = @{
        Kind           = 'vite-npm'
        PackageManager = 'npm'
        PortEnvVar     = 'VITE_PORT'
        ApiTargetEnv   = 'VITE_API_TARGET'
    }
}
