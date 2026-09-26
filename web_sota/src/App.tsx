import { useEffect, useState } from "react";
import type { ReactElement } from "react";
import { useHealth } from "./lib/api";
import { fetchModels, probeProviders } from "./lib/provider";
import {
	Chat,
	Dashboard,
	Device,
	Gallery,
	Help,
	Inbox,
	Logs,
	Lua,
	Skills,
	Tools,
} from "./pages/pages";
import { useLlm } from "./store/llm";

export function Settings() {
	const { provider, model, setProvider, setModel } = useLlm();
	const [providers, setProviders] = useState<string[]>([]);
	const [models, setModels] = useState<string[]>([]);
	const [gpus, setGpus] = useState<any[]>([]);
	useEffect(() => {
		probeProviders()
			.then(setProviders)
			.catch(() => {});
		fetch("/api/llm/gpus")
			.then((r) => r.json())
			.then((j) => setGpus(j.gpus ?? []))
			.catch(() => {});
	}, []);
	useEffect(() => {
		if (provider !== "none")
			fetchModels(provider)
				.then(setModels)
				.catch(() => {});
	}, [provider]);
	return (
		<section>
			<h1 data-testid="settings-title">Settings</h1>
			<div data-testid="settings-health">
				backend {useHealth()?.backend_port ?? "?"} - see Dashboard
			</div>
			<select
				data-testid="llm-provider-select"
				value={provider}
				onChange={(e) => setProvider(e.target.value)}
			>
				<option value="none">No local LLM detected</option>
				{providers.map((p) => (
					<option key={p} value={p}>
						{p}
					</option>
				))}
			</select>
			<select
				data-testid="llm-model-select"
				value={model}
				onChange={(e) => setModel(e.target.value)}
			>
				<option value="none">none</option>
				{models.map((m) => (
					<option key={m} value={m}>
						{m}
					</option>
				))}
			</select>
			{gpus.length > 1 && (
				<select data-testid="llm-gpu-select" defaultValue={1}>
					{gpus.map((g: any) => (
						<option key={g.index} value={g.index}>
							GPU {g.index}
						</option>
					))}
				</select>
			)}
			<button data-testid="settings-save">Save</button>
		</section>
	);
}

const ROUTES: Record<string, ReactElement> = {
	"/": <Dashboard />,
	"/inbox": <Inbox />,
	"/tools": <Tools />,
	"/skills": <Skills />,
	"/chat": <Chat />,
	"/settings": <Settings />,
	"/help": <Help />,
	"/logs": <Logs />,
	"/device": <Device />,
	"/gallery": <Gallery />,
	"/lua": <Lua />,
};

export default function App() {
	const [route, setRoute] = useState(
		window.location.hash.replace("#", "") || "/",
	);
	useEffect(() => {
		const fn = () => setRoute(window.location.hash.replace("#", "") || "/");
		window.addEventListener("hashchange", fn);
		return () => window.removeEventListener("hashchange", fn);
	}, []);
	const Page = ROUTES[route] ?? <Dashboard />;
	return (
		<div
			style={{
				background: "#09090b",
				color: "#e4e4e7",
				minHeight: "100vh",
				display: "flex",
			}}
		>
			<nav
				style={{ width: 200, borderRight: "1px solid #27272a", padding: 12 }}
			>
				<div>bl-halo-mcp</div>
				{[
					["/", "Dashboard"],
					["/device", "Device"],
					["/gallery", "Gallery"],
					["/lua", "Lua"],
					["/inbox", "Inbox"],
					["/tools", "Tools"],
					["/skills", "Skills"],
					["/chat", "Chat"],
					["/settings", "Settings"],
					["/help", "Help"],
					["/logs", "Logs"],
				].map(([to, label]) => (
					<a
						key={to}
						href={`#${to}`}
						data-testid={`nav-${label.toLowerCase()}`}
						style={{ display: "block", padding: 6 }}
					>
						{label}
					</a>
				))}
			</nav>
			<main style={{ flex: 1, padding: 16 }}>{Page}</main>
		</div>
	);
}
