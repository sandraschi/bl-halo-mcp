# Changelog

## 0.2.0 - 2026-09-26

- assfix pass (score 17 -> SOTA): fixed unimportable server module (relative-import
  footgun), pinned fastmcp>=3.4.4,<4 (was resolving 4.0.10), dual-transport
  run_server (stdio + --serve), /mcp mount with lifespan wiring (verified with
  real uvicorn + fastmcp Client, not TestClient), fixed PrefabApp kwargs
  (pyright-caught, card previously rendered empty).
- REST: POST /api/halo action passthrough, POST /api/shutdown (guarded),
  GET /api/photos, /api/llm/discover, nvidia-smi-backed /api/llm/gpus.
- Webapp: all 10 dead buttons wired to live endpoints, loading/error states,
  fetch backoff, health-derived ports, chat history (cap 100) + skill-first pill.
- Gates: pyright clean, CI frontend job (tsc + biome), Annotated params (no Args:
  blocks), output_schema on all tools, .claude-plugin SessionStart, honest e2e.

## 0.1.0 - 2026-09-26

- Initial assfix-zero scaffold: Halo/Frame wrapper (BLE MOCK + live split).
- `halo_device` 19-op portmanteau, Prefab dashboard, help/shutdown, skill, prompt.
- Starlette REST `/api/*` (health, dashboard, tools, skills, devices, logs, llm/*), explicit CORS.
- Vite React catch-them-all dashboard (11976/11977) with MOCK-until-onboarded.
- Docs: ONBOARDING/CONFIGURATION/DEVELOPMENT/TOOLS/TROUBLESHOOTING. MCPB 3-4-100 prompts.
