import { Wrench } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, Err, PageLoading } from "../components/ui";
import { fetchJson, useAsync } from "../lib/api";

interface ToolEntry {
	name: string;
	kind: string;
	ops?: number;
}

export function Tools(): React.ReactElement {
	const tools = useAsync(() => fetchJson("/api/tools", undefined, 1));
	const [q, setQ] = useState(
		new URLSearchParams(window.location.search).get("q") ?? "",
	);
	const list: ToolEntry[] = tools.data?.tools ?? [];
	const portmanteaus = list.filter((t) => t.kind === "portmanteau");
	const solos = list.filter(
		(t) => t.kind !== "portmanteau" && t.kind !== "prefab-app",
	);
	const apps = list.filter((t) => t.kind === "prefab-app");
	const match = (t: ToolEntry): boolean =>
		!q || t.name.toLowerCase().includes(q.toLowerCase());
	if (tools.loading && list.length === 0)
		return <PageLoading label="Tools" testId="tools-loading" />;
	return (
		<section className="space-y-4">
			<h1 data-testid="tools-title" className="text-xl font-bold">
				Tools
			</h1>
			<Err msg={tools.error} />
			<input
				data-testid="tools-search"
				value={q}
				onChange={(e) => setQ(e.target.value)}
				placeholder="Filter tools..."
				className="w-full max-w-sm rounded border border-zinc-800 bg-zinc-950 px-2 py-1.5 text-sm outline-none focus:border-amber-500"
			/>
			{portmanteaus.length > 0 && (
				<h2 className="text-sm font-semibold text-zinc-400">
					Portmanteaus (drill down into ops)
				</h2>
			)}
			<div className="grid gap-3 md:grid-cols-2">
				{portmanteaus.filter(match).map((t) => (
					<Card key={t.name} testId={`tool-card-${t.name}`}>
						<div className="flex items-center gap-2 font-mono text-sm font-semibold">
							<Wrench size={15} className="text-amber-400" /> {t.name}
						</div>
						<div className="mt-1 text-xs text-zinc-500">
							{t.ops ?? "?"} operations - pick one in the runner.
						</div>
						<Link
							data-testid={`tool-run-${t.name}`}
							to={`/tools/${t.name}`}
							className="mt-2 inline-block rounded bg-amber-500 px-2 py-1 text-xs font-semibold text-black hover:bg-amber-400"
						>
							Run tool
						</Link>
					</Card>
				))}
			</div>
			{solos.length > 0 && (
				<h2 className="text-sm font-semibold text-zinc-400">Solo tools</h2>
			)}
			<div className="grid gap-3 md:grid-cols-2">
				{solos.filter(match).map((t) => (
					<Card key={t.name} testId={`tool-card-${t.name}`}>
						<div className="font-mono text-sm font-semibold">{t.name}</div>
						<Link
							data-testid={`tool-run-${t.name}`}
							to={`/tools/${t.name}`}
							className="mt-2 inline-block rounded border border-zinc-700 px-2 py-1 text-xs hover:border-amber-500"
						>
							Run tool
						</Link>
					</Card>
				))}
			</div>
			{apps.length > 0 && (
				<h2 className="text-sm font-semibold text-zinc-400">Prefab apps</h2>
			)}
			<div className="grid gap-3 md:grid-cols-2">
				{apps.filter(match).map((t) => (
					<Card key={t.name} testId={`tool-card-${t.name}`}>
						<div className="font-mono text-sm font-semibold">{t.name}</div>
						<div className="mt-1 text-xs text-zinc-500">
							Rendered card surface (see Dashboard).
						</div>
					</Card>
				))}
			</div>
		</section>
	);
}
