import { useEffect, useState } from "react";
import type { ReactElement } from "react";
import { fetchJson, postHalo, useAsync, useHealth } from "../lib/api";
import { isMock } from "../lib/mockOnboarding";

function Loading({ what }: { what: string }): ReactElement {
	return <div data-testid="loading">{what} loading...</div>;
}

function Err({ msg }: { msg: string }): ReactElement | null {
	return msg ? <div data-testid="error">{msg}</div> : null;
}

export function Dashboard(): ReactElement {
	const h = useHealth();
	const dash = useAsync(() => fetchJson("/api/dashboard", undefined, 1));
	const d = dash.data;
	const mock = isMock(h);
	const be = h?.backend_port ?? "?";
	const fe = h?.frontend_port ?? "?";
	return (
		<section>
			<h1 data-testid="dash-hero">Halo bridge</h1>
			<p data-testid="dash-sub">MOCK-safe Halo/Frame control over BLE + Lua.</p>
			<a data-testid="dash-cta" href="#/device">
				Open device
			</a>
			{mock && (
				<a
					data-testid="onboarding-cue"
					href="#/help"
					style={{
						display: "block",
						background: "#dc2626",
						color: "#fff",
						padding: 12,
					}}
				>
					Complete onboarding - connect Halo
				</a>
			)}
			{mock && (
				<div data-testid="mock-data-banner">
					Sample MOCK data - clears after live connect.
				</div>
			)}
			{dash.loading && <Loading what="Dashboard" />}
			<Err msg={dash.error} />
			<div>
				<div data-testid="kpi-connected">
					connected={String(d?.connected ?? h?.connected ?? false)}
				</div>
				<div data-testid="kpi-battery">battery={d?.device?.battery ?? 87}%</div>
				<div data-testid="kpi-photos">
					photos={d?.photos ?? 0}{" "}
					{mock && <span data-testid="mock-badge">MOCK</span>}
				</div>
				<div data-testid="kpi-ports">
					backend={be} frontend={fe}
				</div>
			</div>
		</section>
	);
}

export function Inbox(): ReactElement {
	const logs = useAsync(() => fetchJson("/api/logs", undefined, 1));
	const items: any[] = logs.data?.items ?? [];
	return (
		<section>
			<h1 data-testid="inbox-title">Inbox</h1>
			{logs.loading && <Loading what="Events" />}
			<Err msg={logs.error} />
			{items.length === 0 && !logs.loading ? (
				<p data-testid="inbox-empty">
					No device events yet - connect Halo to stream taps/photos.
				</p>
			) : (
				<ul data-testid="inbox-list">
					{items.slice(0, 20).map((e: any, i: number) => (
						<li key={i}>
							{e.kind}: {String(e.detail ?? "").slice(0, 80)}
						</li>
					))}
				</ul>
			)}
			<button data-testid="inbox-refresh" onClick={logs.reload}>
				Refresh
			</button>
		</section>
	);
}

export function Tools(): ReactElement {
	const tools = useAsync(() => fetchJson("/api/tools", undefined, 1));
	const [out, setOut] = useState("");
	const [busy, setBusy] = useState(false);
	const names: string[] = (tools.data?.tools ?? []).map((x: any) => x.name);
	return (
		<section>
			<h1 data-testid="tools-title">Tools</h1>
			{tools.loading && <Loading what="Tools" />}
			<Err msg={tools.error} />
			<div data-testid="tools-list">{names.join(", ") || "halo_device"}</div>
			<button
				data-testid="tools-run"
				disabled={busy}
				onClick={async () => {
					setBusy(true);
					try {
						const r = await postHalo("status");
						setOut(r.message ?? JSON.stringify(r));
					} catch (e) {
						setOut(String(e));
					} finally {
						setBusy(false);
					}
				}}
			>
				Run status
			</button>
			<a data-testid="tools-help" href="#/help">
				Help
			</a>
			<div data-testid="tools-output">{out}</div>
		</section>
	);
}

export function Skills(): ReactElement {
	const skills = useAsync(() => fetchJson("/api/skills", undefined, 1));
	const [md, setMd] = useState("");
	const list: any[] = skills.data?.skills ?? [{ name: "halo-dev" }];
	return (
		<section>
			<h1 data-testid="skills-title">Skills</h1>
			{skills.loading && <Loading what="Skills" />}
			<Err msg={skills.error} />
			<div data-testid="skills-list">
				{list.map((s: any) => s.name).join(", ")}
			</div>
			<button
				data-testid="skills-open"
				onClick={async () => {
					try {
						const j = await fetchJson("/api/skills/halo-dev", undefined, 1);
						setMd(String(j.markdown ?? "").slice(0, 2000));
					} catch (e) {
						setMd(String(e));
					}
				}}
			>
				Open SKILL.md
			</button>
			<pre data-testid="skills-body">{md}</pre>
		</section>
	);
}

const CHAT_KEY = "halo_chat_history";
const CHAT_CAP = 100;

function loadHistory(): Array<{ q: string; a: string }> {
	try {
		const raw = localStorage.getItem(CHAT_KEY);
		const arr = raw ? JSON.parse(raw) : [];
		return Array.isArray(arr) ? arr.slice(-CHAT_CAP) : [];
	} catch {
		return [];
	}
}

export function Chat(): ReactElement {
	const [msg, setMsg] = useState("");
	const [hist, setHist] = useState(loadHistory);
	const [sending, setSending] = useState(false);
	const [skill, setSkill] = useState("halo-dev");
	const [skills, setSkills] = useState<string[]>([]);
	useEffect(() => {
		fetchJson("/api/skills", undefined, 1)
			.then((j) => setSkills((j.skills ?? []).map((s: any) => s.name)))
			.catch(() => {});
	}, []);
	return (
		<section>
			<h1 data-testid="chat-title">Chat</h1>
			<div data-testid="chat-skill-first">
				skill:{" "}
				{(skills.length ? skills : [skill]).map((s) => (
					<button
						key={s}
						data-testid={`chat-skill-${s}`}
						onClick={() => setSkill(s)}
						disabled={s === skill}
					>
						{s}
					</button>
				))}
			</div>
			<input
				data-testid="chat-input"
				value={msg}
				onChange={(e) => setMsg(e.target.value)}
				placeholder="Ask Halo/Noa..."
			/>
			<button
				data-testid="chat-send"
				disabled={sending || !msg.trim()}
				onClick={async () => {
					setSending(true);
					try {
						const r = await fetchJson("/api/llm/chat", {
							method: "POST",
							headers: { "Content-Type": "application/json" },
							body: JSON.stringify({ message: msg, skill }),
						});
						const next = [...hist, { q: msg, a: String(r.answer ?? "") }].slice(
							-CHAT_CAP,
						);
						setHist(next);
						localStorage.setItem(CHAT_KEY, JSON.stringify(next));
						setMsg("");
					} finally {
						setSending(false);
					}
				}}
			>
				Send
			</button>
			<div data-testid="chat-answer">
				{hist.length ? hist[hist.length - 1].a : ""}
			</div>
			<div data-testid="chat-count">
				{hist.length}/{CHAT_CAP}
			</div>
		</section>
	);
}

export function Help(): ReactElement {
	const h = useHealth();
	return (
		<section>
			<h1 data-testid="help-title">Help</h1>
			<h2 data-testid="help-wrappee">Wrappee: Halo/Frame + Noa</h2>
			<h2 data-testid="help-ports">
				API/ports: {h?.backend_port ?? "?"} backend, {h?.frontend_port ?? "?"}{" "}
				frontend
			</h2>
			<h2 data-testid="help-faq">
				FAQ: MOCK needs nothing; live needs BLE pair + Noa app
			</h2>
		</section>
	);
}

export function Logs(): ReactElement {
	const logs = useAsync(() => fetchJson("/api/logs", undefined, 1));
	const items: any[] = logs.data?.items ?? [];
	return (
		<section>
			<h1 data-testid="logs-title">Logs</h1>
			{logs.loading && <Loading what="Logs" />}
			<Err msg={logs.error} />
			<div data-testid="logs-list">{items.length} event(s)</div>
			<ul>
				{items.slice(-10).map((e: any, i: number) => (
					<li key={i}>
						{e.kind}: {String(e.detail ?? "").slice(0, 60)}
					</li>
				))}
			</ul>
			<button data-testid="logs-refresh" onClick={logs.reload}>
				Refresh
			</button>
		</section>
	);
}

export function Device(): ReactElement {
	const devs = useAsync(() => fetchJson("/api/devices", undefined, 1));
	const [text, setText] = useState("Hello Halo");
	const [out, setOut] = useState("");
	const [busy, setBusy] = useState(false);
	const run = async (
		op: string,
		extra?: Record<string, unknown>,
	): Promise<void> => {
		setBusy(true);
		try {
			const r = await postHalo(op, extra);
			setOut(r.message ?? JSON.stringify(r));
		} catch (e) {
			setOut(String(e));
		} finally {
			setBusy(false);
		}
	};
	return (
		<section>
			<h1 data-testid="device-title">Device</h1>
			{devs.loading && <Loading what="Devices" />}
			<Err msg={devs.error} />
			<div data-testid="device-list">
				{(devs.data?.items ?? [])
					.map((d: any) => `${d.name}(${d.model})`)
					.join(", ")}
			</div>
			<button
				data-testid="device-connect"
				disabled={busy}
				onClick={() => run("connect")}
			>
				Connect
			</button>
			<button
				data-testid="device-photo"
				disabled={busy}
				onClick={() => run("capture_photo")}
			>
				Capture photo
			</button>
			<input
				data-testid="device-text-input"
				value={text}
				onChange={(e) => setText(e.target.value)}
			/>
			<button
				data-testid="device-text"
				disabled={busy}
				onClick={() => run("show_text", { text })}
			>
				Show text
			</button>
			<div data-testid="device-output">{out}</div>
		</section>
	);
}

export function Gallery(): ReactElement {
	const photos = useAsync(() =>
		fetchJson("/api/photos?limit=20", undefined, 1),
	);
	const items: any[] = photos.data?.items ?? [];
	return (
		<section>
			<h1 data-testid="gallery-title">Gallery</h1>
			{photos.loading && <Loading what="Gallery" />}
			<Err msg={photos.error} />
			<div data-testid="gallery-list">
				{items.length === 0 && !photos.loading
					? "MOCK photos appear after capture_photo."
					: `${items.length} photo(s)`}
			</div>
			<ul>
				{items.map((p: any) => (
					<li key={p.file}>
						{p.file}
						{p.mock ? " (MOCK)" : ""}
					</li>
				))}
			</ul>
			<button data-testid="gallery-refresh" onClick={photos.reload}>
				Refresh
			</button>
		</section>
	);
}

export function Lua(): ReactElement {
	const apps = useAsync(() => postHalo("list_lua_apps", { limit: 50 }));
	const [src, setSrc] = useState(
		"frame.display.text('hi',1,1);frame.display.show()",
	);
	const [name, setName] = useState("main.lua");
	const [out, setOut] = useState("");
	const [busy, setBusy] = useState(false);
	const run = async (
		op: string,
		extra?: Record<string, unknown>,
	): Promise<void> => {
		setBusy(true);
		try {
			const r = await postHalo(op, extra);
			setOut(r.message ?? JSON.stringify(r));
			if (op === "deploy_lua") apps.reload();
		} catch (e) {
			setOut(String(e));
		} finally {
			setBusy(false);
		}
	};
	return (
		<section>
			<h1 data-testid="lua-title">Lua apps</h1>
			{apps.loading && <Loading what="Lua apps" />}
			<Err msg={apps.error} />
			<div data-testid="lua-list">
				{(apps.data?.result?.items ?? []).map((a: any) => a.name).join(", ")}
			</div>
			<textarea
				data-testid="lua-src"
				value={src}
				onChange={(e) => setSrc(e.target.value)}
				rows={4}
			/>
			<button
				data-testid="lua-run"
				disabled={busy}
				onClick={() => run("run_lua", { text: src })}
			>
				Run Lua
			</button>
			<input
				data-testid="lua-name"
				value={name}
				onChange={(e) => setName(e.target.value)}
			/>
			<button
				data-testid="lua-deploy"
				disabled={busy}
				onClick={() => run("deploy_lua", { text: src, lua_name: name })}
			>
				Deploy
			</button>
			<button data-testid="lua-list" onClick={apps.reload}>
				Refresh
			</button>
			<div data-testid="lua-output">{out}</div>
		</section>
	);
}
