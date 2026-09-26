export interface DetectedProvider {
	id: string;
	label: string;
	port: number;
	detected: boolean;
	models: string[];
	loaded: string[];
}

export async function fetchDetect(): Promise<DetectedProvider[]> {
	const r = await fetch("/api/llm/detect");
	if (!r.ok) throw new Error(`detect HTTP ${r.status}`);
	const j = await r.json();
	return j.providers ?? [];
}

export async function fetchModels(provider: string): Promise<string[]> {
	const det = await fetchDetect();
	return det.find((p) => p.id === provider)?.models ?? [];
}

export async function probeProviders(): Promise<string[]> {
	const det = await fetchDetect();
	return det.filter((p) => p.detected).map((p) => p.id);
}
