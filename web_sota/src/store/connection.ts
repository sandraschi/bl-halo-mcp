import { create } from "zustand";

export type ConnState = "connecting" | "connected" | "offline" | "error";

interface Connection {
	state: ConnState;
	lastError: string | null;
	backendPort: number | null;
	frontendPort: number | null;
	mock: boolean;
	set: (p: Partial<Connection>) => void;
}

export const useConnection = create<Connection>((set) => ({
	state: "connecting",
	lastError: null,
	backendPort: null,
	frontendPort: null,
	mock: true,
	set: (p) => set(p),
}));

const BACKOFF = [1, 2, 4, 8, 16, 30];

export async function pollHealth(): Promise<void> {
	const { set } = useConnection.getState();
	for (const wait of BACKOFF) {
		try {
			const ctl = new AbortController();
			const t = setTimeout(() => ctl.abort(), 5000);
			const r = await fetch("/api/health", { signal: ctl.signal });
			clearTimeout(t);
			if (!r.ok) throw new Error(`HTTP ${r.status}`);
			const h = await r.json();
			set({
				state: "connected",
				lastError: null,
				backendPort: h.backend_port ?? null,
				frontendPort: h.frontend_port ?? null,
				mock: h.mock !== false,
			});
			return;
		} catch (e) {
			set({ state: "connecting", lastError: String(e) });
			await new Promise((r) => setTimeout(r, wait * 1000));
		}
	}
	useConnection.getState().set({ state: "offline" });
}
