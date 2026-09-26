import { useState } from "react";
import { Card } from "../components/ui";
import { cn } from "../lib/cn";
import { useConnection } from "../store/connection";

const TABS = ["wrappee", "api", "noa-key", "errors", "faq"] as const;

export function Help(): React.ReactElement {
	const [tab, setTab] = useState<(typeof TABS)[number]>("wrappee");
	const conn = useConnection();
	return (
		<section className="space-y-3">
			<h1 data-testid="help-title" className="text-xl font-bold">
				Help
			</h1>
			<div className="flex flex-wrap gap-1">
				{TABS.map((t) => (
					<button
						key={t}
						onClick={() => setTab(t)}
						className={cn(
							"rounded px-3 py-1.5 text-sm",
							tab === t
								? "bg-amber-500/20 text-amber-300"
								: "bg-zinc-800 text-zinc-400",
						)}
					>
						{t === "wrappee"
							? "Wrappee"
							: t === "api"
								? "API / ports"
								: t === "noa-key"
									? "Noa key"
									: t === "errors"
										? "Error fix"
										: "FAQ"}
					</button>
				))}
			</div>
			{tab === "wrappee" && (
				<Card testId="help-wrappee">
					<h2 className="font-semibold">
						Brilliant Labs Halo (+ Frame) via this bridge
					</h2>
					<ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-zinc-300">
						<li>
							Headless default: FastMCP stdio + Starlette REST + this dashboard.
						</li>
						<li>
							MOCK-first: without glasses every op rehearses against labeled
							fixtures - nothing pretends to be live.
						</li>
						<li>
							Live local (glasses in BLE range): display, camera, IMU/taps,
							audio, Lua - no account, no key.
						</li>
						<li>
							Live cloud (Noa answers): needs a preview key - see the Noa key
							tab.
						</li>
						<li>
							Upstream: docs.brilliant.xyz, brilliant_sdk on PyPI, noa-flutter
							(Noa app), noa-playground (key source).
						</li>
					</ul>
				</Card>
			)}
			{tab === "api" && (
				<Card testId="help-ports">
					<h2 className="font-semibold">API / ports</h2>
					<div className="mt-2 font-mono text-xs text-zinc-300">
						backend {conn.backendPort ?? 11976} (REST /api/* + MCP /mcp) /
						frontend {conn.frontendPort ?? 11977}
					</div>
					<ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-zinc-300">
						<li>
							REST: GET
							/api/health|dashboard|tools|skills|devices|photos|logs|llm/*, POST
							/api/halo|shutdown|llm/chat, GET+POST /api/tools/:name.
						</li>
						<li>
							MCP: stdio (<code>python -m bl_halo_mcp.run_server</code>) or HTTP{" "}
							<code>/mcp</code> (--serve).
						</li>
						<li>
							CORS allowlist: localhost backends/frontends + tauri.localhost
							only.
						</li>
					</ul>
				</Card>
			)}
			{tab === "noa-key" && (
				<Card testId="help-noa">
					<h2 className="font-semibold">Noa key (only noa_ask needs it)</h2>
					<ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-zinc-300">
						<li>
							Open github.com/brilliantlabsAR/noa-playground in a browser.
						</li>
						<li>
							Paste a preview key into its API key box (proves the key works).
						</li>
						<li>
							Copy the same key into <code>NOA_API_KEY</code> in this repo's{" "}
							<code>.env</code>, restart the backend.
						</li>
						<li>
							<code>noa_ask</code> now calls{" "}
							<code>api.brilliant.xyz/dev/noa</code> live. Bad key returns{" "}
							<code>error_type: noa_cloud</code>, never silent mock.
						</li>
					</ol>
					<p className="mt-2 text-xs text-zinc-500">
						Unofficial integration copied from Brilliant's public playground
						code; the /dev endpoint may move. Alternative: Noa mobile app
						account.
					</p>
				</Card>
			)}
			{tab === "errors" && (
				<Card testId="help-faq">
					<h2 className="font-semibold">Error fix</h2>
					<ul className="mt-2 list-disc space-y-1 pl-5 font-mono text-xs text-zinc-300">
						<li>
							ble_unavailable - pip install brilliant-ble brilliant-msg, or stay
							MOCK.
						</li>
						<li>
							noa_cloud - key bad/expired or endpoint moved; re-check key,
							retry.
						</li>
						<li>
							validation - missing required arg for the op (see Tools runner
							schema).
						</li>
						<li>
							Photo is 1x1 PNG / [MOCK Noa] prefix - you are in MOCK by design.
						</li>
						<li>
							Port in use - start.ps1 clears 11976/11977; check
							fleet-start.config.ps1.
						</li>
					</ul>
				</Card>
			)}
			{tab === "faq" && (
				<Card>
					<h2 className="font-semibold">FAQ</h2>
					<ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-zinc-300">
						<li>
							Do I need glasses? No - MOCK rehearses everything. Emulator: pip
							install halo-emulator.
						</li>
						<li>
							Do I need an account? Only for live Noa answers (app account or
							preview key).
						</li>
						<li>
							Is there a public Brilliant REST API? No self-serve one - only the
							app backend + gated preview keys.
						</li>
						<li>
							Frame or Halo? Both - Halo is default; Frame shares the Lua/BLE
							model with a 640x400 display needing show().
						</li>
						<li>
							Where is state? data/halo_state.json (gitignored) + photos +
							lua_apps.
						</li>
					</ul>
				</Card>
			)}
		</section>
	);
}
