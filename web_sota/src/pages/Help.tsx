import { useState } from "react";
import { Card } from "../components/ui";
import { cn } from "../lib/cn";
import { useConnection } from "../store/connection";

const TABS = ["wrappee", "api", "noa", "lua", "errors", "faq"] as const;

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
								: t === "noa"
									? "Noa"
									: t === "lua"
										? "Lua"
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
							Live cloud (Noa answers): needs a preview key - see the Noa tab.
						</li>
						<li>
							Upstream: docs.brilliant.xyz, brilliant_sdk on PyPI, noa-flutter
							(Noa app), noa-playground (key source).
						</li>
						<li>
							Alive, small-batch: first units shipped Aug 2026 after H1 slips,
							limited quantities via brilliant.xyz ($349-399); Frame
							discontinued. China-centered supply chain (factory unnamed) - so
							MOCK-first here is the normal path, not a fallback.
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
			{tab === "noa" && (
				<Card testId="help-noa">
					<h2 className="font-semibold">Noa - the AI behind the glasses</h2>
					<p className="mt-2 text-sm text-zinc-300">
						<strong className="text-zinc-100">Noa</strong> is Brilliant Labs'
						conversational AI companion: the voice/agent that answers when you
						talk to Halo. It lives in the{" "}
						<strong className="text-zinc-100">Noa mobile app</strong>{" "}
						(iOS/Android, open-source Flutter) backed by cloud LLMs at{" "}
						<code>api.brilliant.xyz</code> - the glasses are its ears, eyes and
						mouthpiece, the phone does the thinking.
					</p>
					<ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-zinc-300">
						<li>
							Chat with follow-ups, web search, photo questions, voice
							transcription.
						</li>
						<li>
							<strong className="text-zinc-100">Narrative</strong> - long-term
							memory across conversations (it remembers you).
						</li>
						<li>
							<strong className="text-zinc-100">Miniapps / Vibe Mode</strong> -
							describe an app in plain words, Noa builds it. This bridge's{" "}
							<code>miniapp_create</code> only drafts the Lua half.
						</li>
						<li>
							Free tier with daily usage caps; no credit card for normal use.
						</li>
					</ul>
					<h3 className="mt-3 font-semibold">
						Getting live answers here (only noa_ask needs it)
					</h3>
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
			{tab === "lua" && (
				<Card testId="help-lua">
					<h2 className="font-semibold">
						Lua - the language on your glasses (5-minute tour)
					</h2>
					<p className="mt-2 text-sm text-zinc-300">
						<strong className="text-zinc-100">Lua</strong> is a tiny, fast
						scripting language (Brazil, MIT license, ~30 years old) built to
						live <em>inside</em> other programs - games (Roblox, World of
						Warcraft), Neovim, and here: the Lua 5.4 VM on Halo's Zephyr OS.
						Your Lua runs{" "}
						<strong className="text-zinc-100">on the glasses</strong>; Python on
						your PC only sends code and data over Bluetooth.
					</p>
					<pre className="mt-2 overflow-auto rounded bg-zinc-950 p-3 font-mono text-xs text-zinc-300">{`-- comments start with --
local name = "Halo"          -- always use local, else global
local t = { "a", "b", "c" }  -- tables do arrays AND dicts
print(t[1])                  -- 1-indexed! prints "a", not "c"
print("Hi " .. name)         -- .. joins strings (no +)
if name ~= "Frame" then      -- ~= means not-equal
  print("n=" .. #t)          -- #t = length (3)
end
for i = 1, #t do             -- numeric loop, both ends included
  print(i, t[i])
end
local function greet(who)    -- functions are values too
  return "Hello " .. who
end`}</pre>
					<ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-zinc-300">
						<li>
							Only <code>false</code> and <code>nil</code> are falsey -{" "}
							<code>0</code> and <code>""</code> are{" "}
							<strong className="text-zinc-100">true</strong>. Biggest gotcha
							for Python/JS brains.
						</li>
						<li>
							<code>and</code>/<code>or</code>/<code>not</code> are words,
							blocks end with <code>end</code>, there is no{" "}
							<code>continue</code>.
						</li>
						<li>No classes - tables + functions do the job at this scale.</li>
					</ul>
					<h3 className="mt-3 font-semibold">
						Halo's frame.* API (the glasses half)
					</h3>
					<pre className="mt-2 overflow-auto rounded bg-zinc-950 p-3 font-mono text-xs text-zinc-300">{`frame.display.text("Hello Halo", 1, 1)
-- Halo draws IMMEDIATELY (no show() call).
-- Frame needs frame.display.show() after draws.
-- Siblings: camera (libmpix pipeline), imu (taps),
-- mic/speaker (PCM/LC3), files, bluetooth, button.`}</pre>
					<ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-zinc-300">
						<li>
							Try it: Lua page - Run executes, Deploy saves a <code>*.lua</code>{" "}
							app (20k char limit per call here).
						</li>
						<li>
							No glasses? <code>pip install halo-emulator</code> runs the same
							Lua on your PC.
						</li>
						<li>
							Full reference: docs.brilliant.xyz/halo/halo-sdk-lua ( Tools
							runner: <code>run_lua</code> op).
						</li>
					</ul>
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
