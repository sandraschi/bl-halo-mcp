export async function probeProviders(): Promise<string[]> {
	const out: string[] = [];
	try {
		const r = await fetch("http://127.0.0.1:11434/api/tags", {
			signal: AbortSignal.timeout(3000),
		});
		if (r.ok) out.push("ollama");
	} catch {}
	try {
		const r = await fetch("http://127.0.0.1:1234/v1/models", {
			signal: AbortSignal.timeout(3000),
		});
		if (r.ok) out.push("lmstudio");
	} catch {}
	return out;
}
export async function fetchModels(provider: string): Promise<string[]> {
	try {
		if (provider === "ollama") {
			const r = await fetch("http://127.0.0.1:11434/api/tags");
			const j = await r.json();
			return (j.models ?? []).map((m: any) => m.name);
		}
		const r = await fetch(
			`http://127.0.0.1:${provider === "lmstudio" ? 1234 : 8000}/v1/models`,
		);
		const j = await r.json();
		return (j.data ?? []).map((m: any) => m.id);
	} catch {
		return [];
	}
}
