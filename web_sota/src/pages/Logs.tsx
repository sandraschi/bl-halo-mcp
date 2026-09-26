import { useState } from "react";
import { Card, Err, PageLoading } from "../components/ui";
import { fetchJson, useAsync } from "../lib/api";

export function Logs(): React.ReactElement {
	const logs = useAsync(() => fetchJson("/api/logs", undefined, 1));
	const [level, setLevel] = useState("all");
	const [q, setQ] = useState("");
	const items: Array<{ ts?: number; kind?: string; detail?: string }> =
		logs.data?.items ?? [];
	const kinds = [
		"all",
		...Array.from(new Set(items.map((e) => e.kind ?? "event"))),
	];
	const filtered = items.filter(
		(e) =>
			(level === "all" || e.kind === level) &&
			(!q ||
				`${e.kind} ${e.detail ?? ""}`.toLowerCase().includes(q.toLowerCase())),
	);
	if (logs.loading && items.length === 0)
		return <PageLoading label="Logs" testId="logs-page" />;
	return (
		<section data-testid="logs-page" className="space-y-3">
			<h1 data-testid="logs-title" className="text-xl font-bold">
				Logs
			</h1>
			<Err msg={logs.error} />
			<div
				data-testid="logs-controls"
				className="flex flex-wrap items-center gap-2"
			>
				{kinds.map((k) => (
					<button
						key={k}
						onClick={() => setLevel(k)}
						className={`rounded px-2 py-1 font-mono text-xs ${level === k ? "bg-amber-500/20 text-amber-300" : "bg-zinc-800 text-zinc-400"}`}
					>
						{k} (
						{k === "all"
							? items.length
							: items.filter((e) => e.kind === k).length}
						)
					</button>
				))}
				<input
					data-testid="logs-search"
					value={q}
					onChange={(e) => setQ(e.target.value)}
					placeholder="Search..."
					className="rounded border border-zinc-800 bg-zinc-950 px-2 py-1 font-mono text-xs outline-none focus:border-amber-500"
				/>
				<button
					data-testid="logs-refresh"
					onClick={logs.reload}
					className="rounded border border-zinc-700 px-2 py-1 text-xs hover:border-amber-500"
				>
					Refresh
				</button>
			</div>
			<Card testId="logs-entries">
				<div
					data-testid="logs-list"
					className="mb-2 font-mono text-xs text-zinc-500"
				>
					{filtered.length} event(s)
				</div>
				<ul className="max-h-[60vh] space-y-1 overflow-y-auto font-mono text-xs">
					{filtered
						.slice()
						.reverse()
						.map((e, i) => (
							<li key={i} className="border-b border-zinc-800/50 py-1">
								<span className="text-zinc-500">
									{e.ts ? new Date(e.ts * 1000).toLocaleTimeString() : ""}
								</span>{" "}
								<span className="text-amber-400">{e.kind}</span>{" "}
								<span className="text-zinc-300">{e.detail}</span>
							</li>
						))}
				</ul>
			</Card>
		</section>
	);
}
