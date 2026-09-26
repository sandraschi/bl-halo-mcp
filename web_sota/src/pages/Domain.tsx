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
	const samples = useAsync(() => fetchJson("/api/lua-samples", undefined, 1));
	const [selected, setSelected] = useState<string | null>(null);
	const [src, setSrc] = useState(
		"-- pick an app or a sample, or write a new one",
	);
	const [name, setName] = useState("main.lua");
	const [out, setOut] = useState("");
	const [busy, setBusy] = useState(false);
	const [confirmDelete, setConfirmDelete] = useState(false);
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
			if (op === "deploy_lua" || op === "delete_lua") apps.reload();
		} catch (e) {
			setOut(String(e));
			push("error", String(e).slice(0, 80));
		} finally {
			setBusy(false);
		}
	};
	const openApp = async (n: string): Promise<void> => {
		setBusy(true);
		try {
			const r = await postHalo("get_lua", { lua_name: n });
			if (r.success === false) {
				setOut(r.error ?? "read failed");
				push("error", String(r.error ?? "read failed").slice(0, 80));
				return;
			}
			setName(n);
			setSrc(String(r.result?.source ?? ""));
			setSelected(n);
			setConfirmDelete(false);
		} catch (e) {
			setOut(String(e));
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
			<div className="grid gap-3 md:grid-cols-3">
				<div className="space-y-3">
					<div>
						<div className="mb-1 text-sm font-semibold text-zinc-400">
							On device
						</div>
						<div data-testid="lua-list" className="space-y-1">
							{(apps.data?.result?.items ?? []).map((a: { name: string }) => (
								<button
									key={a.name}
									data-testid={`lua-open-${a.name}`}
									onClick={() => openApp(a.name)}
									className={`block w-full rounded border px-2 py-1 text-left font-mono text-xs ${
										selected === a.name
											? "border-amber-500 text-amber-300"
											: "border-zinc-800 text-zinc-300 hover:border-zinc-600"
									}`}
								>
									{a.name}
								</button>
							))}
							{(apps.data?.result?.items ?? []).length === 0 && (
								<div className="text-xs text-zinc-500">
									{apps.loading ? "loading..." : "no apps yet"}
								</div>
							)}
						</div>
					</div>
					<div>
						<div className="mb-1 text-sm font-semibold text-zinc-400">
							Samples (real frame.* API)
						</div>
						<div className="space-y-1">
							{(samples.data?.items ?? []).map(
								(s: { name: string; source: string }) => (
									<button
										key={s.name}
										data-testid={`lua-sample-${s.name}`}
										onClick={() => {
											setName(s.name);
											setSrc(s.source);
											setSelected(null);
											setConfirmDelete(false);
											push("info", `${s.name} loaded - Save to deploy`);
										}}
										className="block w-full rounded border border-dashed border-zinc-700 px-2 py-1 text-left font-mono text-xs text-zinc-400 hover:border-amber-500"
									>
										{s.name}
									</button>
								),
							)}
						</div>
					</div>
				</div>
				<div className="space-y-2 md:col-span-2">
					<div className="flex gap-2">
						<input
							data-testid="lua-name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							spellCheck={false}
							className="flex-1 rounded border border-zinc-800 bg-zinc-950 px-2 py-1.5 font-mono text-sm outline-none focus:border-amber-500"
						/>
						<button
							data-testid="lua-new"
							onClick={() => {
								setName("untitled.lua");
								setSrc("-- new app\n");
								setSelected(null);
								setConfirmDelete(false);
							}}
							className="rounded border border-zinc-700 px-3 py-1.5 text-sm hover:border-amber-500"
						>
							New
						</button>
					</div>
					<textarea
						data-testid="lua-src"
						value={src}
						onChange={(e) => setSrc(e.target.value)}
						rows={14}
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
						<button
							data-testid="lua-deploy"
							disabled={busy}
							onClick={() => run("deploy_lua", { text: src, lua_name: name })}
							className="rounded border border-zinc-700 px-3 py-1.5 text-sm hover:border-amber-500 disabled:opacity-40"
						>
							Save
						</button>
						{confirmDelete ? (
							<button
								data-testid="lua-confirm-delete"
								disabled={busy}
								onClick={() => {
									setConfirmDelete(false);
									run("delete_lua", { lua_name: name });
								}}
								className="rounded bg-red-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-red-500 disabled:opacity-40"
							>
								Confirm delete {name}?
							</button>
						) : (
							<button
								data-testid="lua-delete"
								disabled={busy}
								onClick={() => setConfirmDelete(true)}
								className="rounded border border-red-800 px-3 py-1.5 text-sm text-red-300 hover:border-red-500 disabled:opacity-40"
							>
								Delete
							</button>
						)}
						<button
							data-testid="lua-refresh"
							onClick={apps.reload}
							className="rounded border border-zinc-700 px-3 py-1.5 text-sm hover:border-amber-500"
						>
							Refresh
						</button>
					</div>
				</div>
			</div>
			{out && (
				<Card testId="lua-output">
					<div className="font-mono text-xs text-zinc-300">{out}</div>
				</Card>
			)}
		</section>
	);
}
