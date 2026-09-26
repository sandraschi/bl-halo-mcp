import { useEffect, useState } from "react";

async function sleep(ms: number): Promise<void> {
	await new Promise((r) => setTimeout(r, ms));
}

export async function fetchJson(
	path: string,
	init?: RequestInit,
	retries = 3,
): Promise<any> {
	let delay = 1000;
	let lastErr: unknown = null;
	for (let attempt = 0; attempt <= retries; attempt++) {
		try {
			const r = await fetch(path, init);
			if (!r.ok && r.status >= 500 && attempt < retries) {
				throw new Error(`HTTP ${r.status}`);
			}
			return await r.json();
		} catch (e) {
			lastErr = e;
			if (attempt < retries) {
				await sleep(delay);
				delay *= 2;
			}
		}
	}
	throw lastErr;
}

export async function postHalo(
	operation: string,
	extra?: Record<string, unknown>,
): Promise<any> {
	return fetchJson("/api/halo", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ operation, ...(extra ?? {}) }),
	});
}

export async function getHealth(): Promise<any> {
	return fetchJson("/api/health", undefined, 1);
}

export async function getDashboard(): Promise<any> {
	return fetchJson("/api/dashboard", undefined, 1);
}

export function useHealth(): any {
	const [h, setH] = useState<any>(null);
	useEffect(() => {
		getHealth()
			.then(setH)
			.catch(() => setH({ ok: false }));
	}, []);
	return h;
}

export function useAsync<T>(fn: () => Promise<T>): {
	data: T | null;
	loading: boolean;
	error: string;
	reload: () => void;
} {
	const [data, setData] = useState<T | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [tick, setTick] = useState(0);
	useEffect(() => {
		setLoading(true);
		setError("");
		fn()
			.then((d) => setData(d))
			.catch((e) => setError(String(e?.message ?? e)))
			.finally(() => setLoading(false));
	}, [tick]);
	return { data, loading, error, reload: () => setTick((t) => t + 1) };
}
