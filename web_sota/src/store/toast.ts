import { create } from "zustand";

export interface Toast {
	id: number;
	kind: "success" | "error" | "info";
	msg: string;
}

let nextId = 1;

interface Toasts {
	items: Toast[];
	push: (kind: Toast["kind"], msg: string) => void;
	dismiss: (id: number) => void;
}

export const useToasts = create<Toasts>((set) => ({
	items: [],
	push: (kind, msg) => {
		const id = nextId++;
		set((s) => ({ items: [...s.items.slice(-4), { id, kind, msg }] }));
		setTimeout(() => {
			set((s) => ({ items: s.items.filter((t) => t.id !== id) }));
		}, 5000);
	},
	dismiss: (id) => set((s) => ({ items: s.items.filter((t) => t.id !== id) })),
}));
