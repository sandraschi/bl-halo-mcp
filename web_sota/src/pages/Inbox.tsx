import { Card, Err, PageLoading } from "../components/ui";
import { fetchJson, useAsync } from "../lib/api";

export function Inbox(): React.ReactElement {
	const logs = useAsync(() => fetchJson("/api/logs", undefined, 1));
	const items: Array<{ ts?: number; kind?: string; detail?: string }> =
		logs.data?.items ?? [];
	if (logs.loading && items.length === 0) return <PageLoading label="Events" />;
	return (
		<section className="space-y-3">
			<h1 data-testid="inbox-title" className="text-xl font-bold">
				Inbox
			</h1>
			<Err msg={logs.error} />
			{items.length === 0 ? (
				<p data-testid="inbox-empty" className="text-sm text-zinc-500">
					No device events yet - connect Halo to stream taps/photos.
				</p>
			) : (
				<Card testId="inbox-list">
					<ul className="space-y-1 font-mono text-xs">
						{items.slice(0, 30).map((e, i) => (
							<li key={i} className="border-b border-zinc-800/50 py-1">
								<span className="text-amber-400">{e.kind}</span>{" "}
								<span className="text-zinc-500">
									{e.ts ? new Date(e.ts * 1000).toLocaleTimeString() : ""}
								</span>
								<div className="text-zinc-300">
									{String(e.detail ?? "").slice(0, 120)}
								</div>
							</li>
						))}
					</ul>
				</Card>
			)}
			<button
				data-testid="inbox-refresh"
				onClick={logs.reload}
				className="rounded border border-zinc-700 px-3 py-1.5 text-sm hover:border-amber-500"
			>
				Refresh
			</button>
		</section>
	);
}
