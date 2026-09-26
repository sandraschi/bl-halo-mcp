import { useEffect, useState } from "react";

export async function getHealth(): Promise<any> {
	const r = await fetch("/api/health");
	return r.json();
}
export async function getDashboard(): Promise<any> {
	const r = await fetch("/api/dashboard");
	return r.json();
}
export function useHealth() {
	const [h, setH] = useState<any>(null);
	useEffect(() => {
		getHealth()
			.then(setH)
			.catch(() => setH({ ok: false }));
	}, []);
	return h;
}
