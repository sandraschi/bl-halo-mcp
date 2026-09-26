import { create } from "zustand";

type Llm = {
	provider: string;
	model: string;
	setProvider: (p: string) => void;
	setModel: (m: string) => void;
};

export const useLlm = create<Llm>((set) => ({
	provider: localStorage.getItem("llm_provider") ?? "none",
	model: localStorage.getItem("llm_model") ?? "none",
	setProvider: (provider) => {
		localStorage.setItem("llm_provider", provider);
		set({ provider });
	},
	setModel: (model) => {
		localStorage.setItem("llm_model", model);
		set({ model });
	},
}));
