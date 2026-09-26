import { useEffect, useState } from "react";
import { getDashboard, useHealth } from "../lib/api";
import { isMock } from "../lib/mockOnboarding";

export function Dashboard() {
	const h = useHealth();
	const [d, setD] = useState<any>(null);
	useEffect(() => {
		getDashboard()
			.then(setD)
			.catch(() => {});
	}, []);
	const mock = isMock(h);
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
			<div>
				<div data-testid="kpi-connected">
					connected={String(d?.connected ?? h?.connected ?? false)}
				</div>
				<div data-testid="kpi-battery">battery={d?.device?.battery ?? 87}%</div>
				<div data-testid="kpi-photos">
					photos={d?.photos ?? 0}{" "}
					{mock && <span data-testid="mock-badge">MOCK</span>}
				</div>
			</div>
		</section>
	);
}
export function Inbox() {
	return (
		<section>
			<h1 data-testid="inbox-title">Inbox</h1>
			<p data-testid="inbox-empty">
				No device events yet - connect Halo to stream taps/photos.
			</p>
			<button data-testid="inbox-refresh">Refresh</button>
		</section>
	);
}
export function Tools() {
	const [t, setT] = useState<any>(null);
	useEffect(() => {
		fetch("/api/tools")
			.then((r) => r.json())
			.then(setT)
			.catch(() => {});
	}, []);
	return (
		<section>
			<h1 data-testid="tools-title">Tools</h1>
			<div data-testid="tools-list">
				{(t?.tools ?? []).map((x: any) => x.name).join(", ") || "halo_device"}
			</div>
			<button data-testid="tools-run">Run status</button>
			<button data-testid="tools-help">Help</button>
		</section>
	);
}
export function Skills() {
	return (
		<section>
			<h1 data-testid="skills-title">Skills</h1>
			<div data-testid="skills-list">halo-dev</div>
			<button data-testid="skills-open">Open SKILL.md</button>
		</section>
	);
}
export function Chat() {
	const [msg, setMsg] = useState("");
	const [ans, setAns] = useState("");
	return (
		<section>
			<h1 data-testid="chat-title">Chat</h1>
			<input
				data-testid="chat-input"
				value={msg}
				onChange={(e) => setMsg(e.target.value)}
				placeholder="Ask Halo/Noa..."
			/>
			<button
				data-testid="chat-send"
				onClick={async () => {
					const r = await fetch("/api/llm/chat", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ message: msg }),
					});
					setAns((await r.json()).answer ?? "");
				}}
			>
				Send
			</button>
			<div data-testid="chat-answer">{ans}</div>
		</section>
	);
}
export function Help() {
	return (
		<section>
			<h1 data-testid="help-title">Help</h1>
			<h2 data-testid="help-wrappee">Wrappee: Halo/Frame + Noa</h2>
			<h2 data-testid="help-ports">API/ports: 11976 backend, 11977 frontend</h2>
			<h2 data-testid="help-faq">
				FAQ: MOCK needs nothing; live needs BLE pair + Noa app
			</h2>
		</section>
	);
}
export function Logs() {
	const [l, setL] = useState<any[]>([]);
	useEffect(() => {
		fetch("/api/logs")
			.then((r) => r.json())
			.then((j) => setL(j.items ?? []))
			.catch(() => {});
	}, []);
	return (
		<section>
			<h1 data-testid="logs-title">Logs</h1>
			<div data-testid="logs-list">{l.length} event(s)</div>
			<button
				data-testid="logs-refresh"
				onClick={() => window.location.reload()}
			>
				Refresh
			</button>
		</section>
	);
}
export function Device() {
	return (
		<section>
			<h1 data-testid="device-title">Device</h1>
			<button data-testid="device-connect">Connect</button>
			<button data-testid="device-photo">Capture photo</button>
			<button data-testid="device-text">Show text</button>
		</section>
	);
}
export function Gallery() {
	return (
		<section>
			<h1 data-testid="gallery-title">Gallery</h1>
			<div data-testid="gallery-list">
				MOCK photos appear after capture_photo.
			</div>
			<button data-testid="gallery-refresh">Refresh</button>
		</section>
	);
}
export function Lua() {
	return (
		<section>
			<h1 data-testid="lua-title">Lua apps</h1>
			<button data-testid="lua-run">Run Lua</button>
			<button data-testid="lua-deploy">Deploy</button>
			<button data-testid="lua-list">Refresh</button>
		</section>
	);
}
