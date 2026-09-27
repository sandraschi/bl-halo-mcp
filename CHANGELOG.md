# Changelog

## Unreleased

- Health-log spam fix: `_HealthCheckFilter` drops `/health` probes from the
  uvicorn access log (installed at import time — the fleet launcher bypasses
  `main()`). Real traffic still logs. Restart backend to pick up.
- Assfix 2026-09-27 (report: `reports/assess-2026-09-27.md`): added
  `GET /api/capabilities` (service/version/ports/tools/skills/routes),
  `.pre-commit-config.yaml` + `scripts/pre-commit-biome.ps1` + `just bootstrap`,
  `.gitattributes` (LF normalization).

## 0.3.0 - 2026-09-26

- Live Noa cloud path: `noa_ask` with `NOA_API_KEY` calls `api.brilliant.xyz/dev/noa`
  (contract copied from Brilliant's public noa-playground; raw-token Authorization,
  multipart prompt/messages/image/experimental/time/location). Failures return
  `error_type: noa_cloud`, never silent mock. Without a key the labeled MOCK stands.
- Help rewritten as a capability matrix (nothing/glasses/key tiers) + hardware topic
  with grounded specs (Balletto B1, PAG7982J1, 256x256 drawable, no-show() draws).
- Webapp SOTA rebuild: Tailwind Zinc/Amber dark, Lucide, Framer Motion, Zustand,
  BrowserRouter, AppLayout (top collapse toggle, topbar health dot, help modal,
  toasts, companion mode, disconnect e-stop, Ctrl+L logs), Tools portmanteau
  drill-down + schema runner, tabbed Help, backend-mediated LLM detect
  (no direct browser-to-provider fetch), LlmOnboarding-style Settings, Hardware
  page with Three.js STL viewer (official halo.stl URL + file picker), AppsHub
  experimental stub. All prior data-testids preserved.
- Backend: `GET /api/llm/detect`, `GET+POST /api/tools/:name` (reuses server
  tool coroutines directly), `noa_configured` in health.
- Docs: new docs/HARDWARE.md (official STL link, corrected spec, safety);
  README hardware section; Noa key acquisition in ONBOARDING + SKILL.

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
