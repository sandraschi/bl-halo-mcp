import { useState } from "react";
import { Card, Err, PageLoading } from "../components/ui";
import { fetchJson, postHalo, useAsync } from "../lib/api";
import { useToasts } from "../store/toast";

export function Device(): React.ReactElement {
	const devs = useAsync(() => fetchJson("/api/devices", undefined, 1));
	const [text, setText] = useState("Hello Halo");
	const [out, setOut] = useState("");
	const [busy, setBusy] = useState(false);
	const push = useToasts((s) => s.push);
	const run = async (
		op: string,
		extra?: Record<string, unknown>,
	): Promise<void> => {
		setBusy(true);
		try {
			const r = await postHalo(op, extra);
			setOut(r.message ?? JSON.stringify(r));
			push(
				r.success === false ? "error" : "success",
				`${op}: ${r.message ?? ""}`.slice(0, 80),
			);
		} catch (e) {
			setOut(String(e));
			push("error", String(e).slice(0, 80));
		} finally {
			setBusy(false);
		}
	};
	if (devs.loading) return <PageLoading label="Devices" />;
	return (
		<section className="space-y-3">
			<h1 data-testid="device-title" className="text-xl font-bold">
				Device
			</h1>
			<Err msg={devs.error} />
			<Card testId="device-list">
				<div className="font-mono text-sm">
					{(devs.data?.items ?? [])
						.map(
							(d: { name: string; model: string; connected: boolean }) =>
								`${d.name} (${d.model}) ${d.connected ? "[live]" : "[idle]"}`,
						)
						.join(" · ")}
				</div>
			</Card>
			<div className="flex flex-wrap gap-2">
				<button
					data-testid="device-connect"
					disabled={busy}
					onClick={() => run("connect")}
					className="rounded bg-amber-500 px-3 py-1.5 text-sm font-semibold text-black hover:bg-amber-400 disabled:opacity-40"
				>
					Connect
				</button>
				<button
					data-testid="device-photo"
					disabled={busy}
					onClick={() => run("capture_photo")}
					className="rounded border border-zinc-700 px-3 py-1.5 text-sm hover:border-amber-500 disabled:opacity-40"
				>
					Capture photo
				</button>
			</div>
			<div className="flex gap-2">
				<input
					data-testid="device-text-input"
					value={text}
					onChange={(e) => setText(e.target.value)}
					className="flex-1 rounded border border-zinc-800 bg-zinc-950 px-3 py-1.5 text-sm outline-none focus:border-amber-500"
				/>
				<button
					data-testid="device-text"
					disabled={busy}
					onClick={() => run("show_text", { text })}
					className="rounded border border-zinc-700 px-3 py-1.5 text-sm hover:border-amber-500 disabled:opacity-40"
				>
					Show text
				</button>
			</div>
			{out && (
				<Card testId="device-output">
					<div className="font-mono text-xs text-zinc-300">{out}</div>
				</Card>
			)}
		</section>
	);
}

export function Gallery(): React.ReactElement {
	const photos = useAsync(() =>
		fetchJson("/api/photos?limit=20", undefined, 1),
	);
	const items: Array<{ file: string; mock?: boolean }> =
		photos.data?.items ?? [];
	if (photos.loading && items.length === 0)
		return <PageLoading label="Gallery" />;
	return (
		<section className="space-y-3">
			<h1 data-testid="gallery-title" className="text-xl font-bold">
				Gallery
			</h1>
			<Err msg={photos.error} />
			<div
				data-testid="gallery-list"
				className="font-mono text-xs text-zinc-500"
			>
				{items.length === 0
					? "MOCK photos appear after capture_photo."
					: `${items.length} photo(s)`}
			</div>
			<ul className="space-y-1 font-mono text-xs">
				{items.map((p) => (
					<li
						key={p.file}
						className="rounded border border-zinc-800 bg-zinc-900/60 px-2 py-1"
					>
						{p.file}
						{p.mock ? " (MOCK)" : ""}
					</li>
				))}
			</ul>
			<button
				data-testid="gallery-refresh"
				onClick={photos.reload}
				className="rounded border border-zinc-700 px-3 py-1.5 text-sm hover:border-amber-500"
			>
				Refresh
			</button>
		</section>
	);
}

export function Lua(): React.ReactElement {
	const apps = useAsync(() => postHalo("list_lua_apps", { limit: 50 }));
	const [src, setSrc] = useState(
		"frame.display.text('hi',1,1);frame.display.show()",
	);
	const [name, setName] = useState("main.lua");
	const [out, setOut] = useState("");
	const [busy, setBusy] = useState(false);
	const push = useToasts((s) => s.push);
	const run = async (
		op: string,
		extra?: Record<string, unknown>,
	): Promise<void> => {
		setBusy(true);
		try {
			const r = await postHalo(op, extra);
			setOut(r.message ?? JSON.stringify(r));
			push(r.success === false ? "error" : "success", `${op} done`);
			if (op === "deploy_lua") apps.reload();
		} catch (e) {
			setOut(String(e));
			push("error", String(e).slice(0, 80));
		} finally {
			setBusy(false);
		}
	};
	return (
		<section className="space-y-3">
			<h1 data-testid="lua-title" className="text-xl font-bold">
				Lua apps
			</h1>
			<Err msg={apps.error} />
			<div data-testid="lua-list" className="font-mono text-xs text-zinc-400">
				{(apps.data?.result?.items ?? [])
					.map((a: { name: string }) => a.name)
					.join(", ") || (apps.loading ? "loading..." : "no apps")}
			</div>
			<textarea
				data-testid="lua-src"
				value={src}
				onChange={(e) => setSrc(e.target.value)}
				rows={4}
				spellCheck={false}
				className="w-full rounded border border-zinc-800 bg-zinc-950 px-2 py-1.5 font-mono text-xs outline-none focus:border-amber-500"
			/>
			<div className="flex flex-wrap gap-2">
				<button
					data-testid="lua-run"
					disabled={busy}
					onClick={() => run("run_lua", { text: src })}
					className="rounded bg-amber-500 px-3 py-1.5 text-sm font-semibold text-black hover:bg-amber-400 disabled:opacity-40"
				>
					Run Lua
				</button>
				<input
					data-testid="lua-name"
					value={name}
					onChange={(e) => setName(e.target.value)}
					className="rounded border border-zinc-800 bg-zinc-950 px-2 py-1.5 font-mono text-sm outline-none focus:border-amber-500"
				/>
				<button
					data-testid="lua-deploy"
					disabled={busy}
					onClick={() => run("deploy_lua", { text: src, lua_name: name })}
					className="rounded border border-zinc-700 px-3 py-1.5 text-sm hover:border-amber-500 disabled:opacity-40"
				>
					Deploy
				</button>
				<button
					data-testid="lua-list"
					onClick={apps.reload}
					className="rounded border border-zinc-700 px-3 py-1.5 text-sm hover:border-amber-500"
				>
					Refresh
				</button>
			</div>
			{out && (
				<Card testId="lua-output">
					<div className="font-mono text-xs text-zinc-300">{out}</div>
				</Card>
			)}
		</section>
	);
}
