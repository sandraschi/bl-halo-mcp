import { useEffect, useState } from "react";
import { Card, Err, PageLoading } from "../components/ui";
import { type DetectedProvider, fetchDetect } from "../lib/provider";
import { useConnection } from "../store/connection";
import { useLlm } from "../store/llm";

export function Settings(): React.ReactElement {
	const { provider, model, setProvider, setModel } = useLlm();
	const conn = useConnection();
	const [det, setDet] = useState<DetectedProvider[]>([]);
	const [status, setStatus] = useState<Record<string, string>>({});
	const [probing, setProbing] = useState(true);
	const [error, setError] = useState("");
	const [gpus, setGpus] = useState<Array<{ index: number; name: string }>>([]);
	const [gpu, setGpu] = useState(() => localStorage.getItem("llm_gpu") ?? "");
	const [noa, setNoa] = useState<boolean | null>(null);

	useEffect(() => {
		setProbing(true);
		const ids = ["ollama", "lmstudio", "vllm"];
		setStatus(Object.fromEntries(ids.map((id) => [id, "probing"])));
		fetchDetect()
			.then((d) => {
				setDet(d);
				setStatus(
					Object.fromEntries(
						d.map((p) => [p.id, p.detected ? "detected" : "not_found"]),
					),
				);
				if (!d.some((p) => p.id === provider && p.detected)) {
					const first = d.find((p) => p.detected);
					if (first) {
						setProvider(first.id);
						const valid = first.models.includes(model)
							? model
							: (first.models[0] ?? "none");
						setModel(valid);
					}
				}
			})
			.catch((e) => setError(String(e?.message ?? e)))
			.finally(() => setProbing(false));
		fetch("/api/llm/gpus")
			.then((r) => r.json())
			.then((j) => {
				setGpus(j.gpus ?? []);
				if (!localStorage.getItem("llm_gpu") && (j.gpus ?? []).length > 1) {
					const secondary =
						(j.gpus ?? []).find((g: { index: number }) => g.index > 0) ??
						j.gpus[0];
					setGpu(String(secondary.index));
					localStorage.setItem("llm_gpu", String(secondary.index));
				} else if ((j.gpus ?? []).length <= 1) {
					setGpu((j.gpus ?? [])[0] ? String(j.gpus[0].index) : "");
				}
			})
			.catch(() => {});
		fetch("/api/health")
			.then((r) => r.json())
			.then((h) => setNoa(h.noa_configured ?? null))
			.catch(() => {});
	}, []);

	const changeProvider = (id: string): void => {
		setProvider(id);
		const p = det.find((d) => d.id === id);
		setModel(p?.models[0] ?? "none");
	};

	const current = det.find((d) => d.id === provider);
	const anyDetected = det.some((d) => d.detected);

	return (
		<section className="space-y-4">
			<h1 data-testid="settings-title" className="text-xl font-bold">
				Settings
			</h1>
			{probing && <PageLoading label="Probing providers" />}
			<Err msg={error} />
			{!probing && !anyDetected && (
				<div className="rounded border border-amber-700 bg-amber-950 px-3 py-2 text-sm text-amber-200">
					Install Ollama or LM Studio to enable AI features. No local LLM
					detected.
				</div>
			)}
			{gpus.length > 0 && (
				<div className="rounded border border-zinc-800 bg-zinc-900/60 p-3 text-sm text-zinc-400">
					High-performance GPU detected. Install Ollama/LM Studio to unlock AI
					features for free.
				</div>
			)}
			<Card testId="settings-health">
				<div className="text-sm">
					Backend {conn.backendPort ?? "?"} / frontend{" "}
					{conn.frontendPort ?? "?"} - {conn.state}
				</div>
				<div className="mt-1 text-sm">
					Noa cloud key:{" "}
					{noa === null ? (
						<span className="text-zinc-500">unknown</span>
					) : noa ? (
						<span className="text-green-400">configured</span>
					) : (
						<span className="text-amber-300">
							missing - noa_ask answers MOCK (see Help - Noa key)
						</span>
					)}
				</div>
			</Card>
			<div className="grid gap-3 md:grid-cols-3">
				{det.map((p) => (
					<Card key={p.id} testId={`llm-provider-card-${p.id}`}>
						<div className="flex items-center gap-2 text-sm font-semibold">
							<span
								className={`h-2 w-2 rounded-full ${status[p.id] === "detected" ? "bg-green-500" : status[p.id] === "probing" ? "bg-amber-500 animate-pulse" : "bg-zinc-600"}`}
							/>
							{p.label}
							<span className="font-mono text-[11px] text-zinc-500">
								:{p.port}
							</span>
						</div>
						<div className="mt-1 text-xs text-zinc-500">
							{status[p.id] === "probing"
								? "Probing..."
								: p.detected
									? `Detected - ${p.models.length} model(s)`
									: "Not found"}
						</div>
						{p.id === "ollama" && p.loaded.length > 0 && (
							<div className="mt-1 text-xs text-blue-300">
								Loaded: {p.loaded.join(", ")}
							</div>
						)}
					</Card>
				))}
			</div>
			<Card>
				<div className="grid gap-3 md:grid-cols-2">
					<label className="block text-sm">
						<span className="text-zinc-400">Provider</span>
						<select
							data-testid="llm-provider-select"
							value={provider}
							onChange={(e) => changeProvider(e.target.value)}
							className="mt-1 w-full rounded border border-zinc-800 bg-zinc-950 px-2 py-1.5 text-sm outline-none focus:border-amber-500"
						>
							{!anyDetected && (
								<option value="none">No local LLM detected</option>
							)}
							{det
								.filter((d) => d.detected)
								.map((p) => (
									<option key={p.id} value={p.id}>
										{p.label}
									</option>
								))}
						</select>
					</label>
					<label className="block text-sm">
						<span className="text-zinc-400">Model</span>
						<select
							data-testid="llm-model-select"
							value={model}
							onChange={(e) => setModel(e.target.value)}
							className="mt-1 w-full rounded border border-zinc-800 bg-zinc-950 px-2 py-1.5 font-mono text-sm outline-none focus:border-amber-500"
						>
							<option value="none">none</option>
							{(current?.models ?? []).map((m) => (
								<option key={m} value={m}>
									{m}
								</option>
							))}
						</select>
					</label>
				</div>
				{gpus.length > 1 && (
					<label className="mt-3 block text-sm">
						<span className="text-zinc-400">
							GPU (secondary default - keeps the 4090 resident model loaded)
						</span>
						<select
							data-testid="llm-gpu-select"
							value={gpu}
							onChange={(e) => {
								setGpu(e.target.value);
								localStorage.setItem("llm_gpu", e.target.value);
							}}
							className="mt-1 w-full rounded border border-zinc-800 bg-zinc-950 px-2 py-1.5 font-mono text-sm outline-none focus:border-amber-500"
						>
							{gpus.map((g) => (
								<option key={g.index} value={g.index}>
									GPU {g.index} - {g.name}
								</option>
							))}
						</select>
					</label>
				)}
				<button
					data-testid="settings-save"
					onClick={() => {}}
					className="mt-3 rounded border border-zinc-700 px-3 py-1.5 text-sm hover:border-amber-500"
				>
					Save
				</button>
			</Card>
		</section>
	);
}
