import { Card } from "../components/ui";

export function AppsHub(): React.ReactElement {
	return (
		<section className="space-y-3">
			<h1 data-testid="apps-title" className="text-xl font-bold">
				Apps Hub{" "}
				<span
					data-testid="apps-experimental"
					className="rounded bg-zinc-700 px-2 py-0.5 align-middle text-xs font-normal text-amber-300"
				>
					Experimental
				</span>
			</h1>
			<Card testId="apps-stub">
				<p className="text-sm text-zinc-300">
					Fleet-wide app discovery (registry-backed health scan of sibling MCP
					webapps) is not wired yet. Follow-up: backend fleet catalog + live
					port audit per the fleet AppsHub pattern, then this stub becomes live
					cards.
				</p>
				<p className="mt-2 text-xs text-zinc-500">
					This dashboard (bl-halo-mcp 11976/11977) is healthy - see the topbar
					dot.
				</p>
			</Card>
		</section>
	);
}
