import { Link } from "react-router-dom";
import { Card, Err, Kpi, PageLoading } from "../components/ui";
import { fetchJson } from "../lib/api";
import { useAsync } from "../lib/api";
import { isMock } from "../lib/mockOnboarding";
import { useConnection } from "../store/connection";

export function Dashboard(): React.ReactElement {
	const conn = useConnection();
	const dash = useAsync(() => fetchJson("/api/dashboard", undefined, 1));
	const d = dash.data;
	const mock = conn.mock;
	if (dash.loading && !d) return <PageLoading label="Dashboard" />;
	return (
		<section data-testid="dashboard" className="space-y-4">
			<div className="rounded-lg border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-950 p-6">
				<h1 data-testid="dash-hero" className="text-2xl font-bold">
					Halo bridge <span className="text-amber-400">bl-halo-mcp</span>
				</h1>
				<p data-testid="dash-sub" className="mt-1 text-sm text-zinc-400">
					MOCK-safe Halo/Frame control over BLE + Lua. Backend{" "}
					{conn.backendPort ?? "?"} / frontend {conn.frontendPort ?? "?"}.
				</p>
				<div className="mt-3 flex gap-2">
					<Link
						data-testid="dash-cta"
						to="/device"
						className="rounded bg-amber-500 px-3 py-1.5 text-sm font-semibold text-black hover:bg-amber-400"
					>
						Open device
					</Link>
					<Link
						data-testid="dash-hardware"
						to="/hardware"
						className="rounded border border-zinc-700 px-3 py-1.5 text-sm hover:border-amber-500"
					>
						View hardware 3D
					</Link>
				</div>
				{mock && (
					<Link
						data-testid="onboarding-cue"
						to="/settings"
						className="mt-3 block rounded bg-red-600 p-3 text-sm font-semibold text-white hover:bg-red-500"
					>
						Complete onboarding - connect Halo or set up AI
					</Link>
				)}
				{mock && (
					<div
						data-testid="mock-data-banner"
						className="mt-2 text-xs text-zinc-500"
					>
						Sample MOCK data - clears after live connect.
					</div>
				)}
			</div>
			<Err msg={dash.error} />
			<div className="grid grid-cols-2 gap-3 md:grid-cols-4">
				<Kpi
					testId="kpi-connected"
					label="connected"
					value={(d?.connected ?? conn.state === "connected") ? "yes" : "no"}
				/>
				<Kpi
					testId="kpi-battery"
					label="battery"
					value={`${d?.device?.battery ?? 87}%`}
				/>
				<Kpi
					testId="kpi-photos"
					label="photos"
					value={String(d?.photos ?? 0)}
					badge={
						mock ? (
							<span
								data-testid="mock-badge"
								className="rounded bg-zinc-700 px-1 text-xs text-amber-300"
							>
								MOCK
							</span>
						) : undefined
					}
				/>
				<Kpi
					testId="kpi-lua"
					label="lua apps"
					value={String((d?.lua_apps ?? []).length)}
				/>
			</div>
			<div className="grid gap-3 md:grid-cols-2">
				<Card testId="dash-opencall">
					<div className="mb-1 text-sm font-semibold">Display</div>
					<div className="font-mono text-xs text-zinc-400">
						{String(d?.display?.last_text || "(empty)")}
					</div>
				</Card>
				<Card testId="dash-noa">
					<div className="mb-1 text-sm font-semibold">
						Noa queries this session
					</div>
					<div className="font-mono text-xs text-zinc-400">
						{String(d?.noa_queries ?? 0)}
					</div>
				</Card>
			</div>
		</section>
	);
}
