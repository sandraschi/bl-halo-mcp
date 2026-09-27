import { Send } from "lucide-react";
import { useEffect, useState } from "react";
import { Card } from "../components/ui";
import { fetchJson } from "../lib/api";
import { useLlm } from "../store/llm";

const PERSONALITIES: Record<string, string> = {
	"Halo Guide":
		"You are a helpful guide to Brilliant Labs Halo/Frame glasses. Answer briefly.",
	"Lua Hacker":
		"You are a Lua 5.4 frame.* API expert. Answer with short code-first replies.",
	"Hardware Nerd":
		"You are a hardware engineer who loves part numbers and specs. Answer precisely.",
	"Noa Scout":
		"You are a Noa cloud-assistant expert: preview keys, playground contract, MOCK-vs-live. Answer practically.",
	Custom: "",
};

const EXAMPLE_PROMPTS = [
	"Show 'Hello Halo' on the display",
	"How do I run Lua on Halo vs Frame?",
	"Take a photo and list recent captures",
	"How do I get a Noa preview key?",
	"What IMU and tap data can I read?",
	"Draft a Lua clock miniapp",
];

const CHAT_KEY = "halo_chat_history";
const CHAT_CAP = 100;

interface Msg {
	q: string;
	a: string;
	mocked: boolean;
}

function loadHistory(): Msg[] {
	try {
		const raw = localStorage.getItem(CHAT_KEY);
		const arr = raw ? JSON.parse(raw) : [];
		return Array.isArray(arr) ? arr.slice(-CHAT_CAP) : [];
	} catch {
		return [];
	}
}

export function Chat(): React.ReactElement {
	const { provider, model } = useLlm();
	const [msg, setMsg] = useState("");
	const [hist, setHist] = useState<Msg[]>(loadHistory);
	const [sending, setSending] = useState(false);
	const [skill, setSkill] = useState("halo-dev");
	const [skills, setSkills] = useState<string[]>([]);
	const [personality, setPersonality] = useState("Halo Guide");
	const [customText, setCustomText] = useState("");
	const [sendError, setSendError] = useState("");
	useEffect(() => {
		fetchJson("/api/skills", undefined, 1)
			.then((j) =>
				setSkills((j.skills ?? []).map((s: { name: string }) => s.name)),
			)
			.catch(() => {});
	}, []);

	const systemPrompt =
		personality === "Custom" ? customText.trim() : PERSONALITIES[personality];

	const clearHist = (): void => {
		setHist([]);
		localStorage.removeItem(CHAT_KEY);
	};
	const exportHist = (): void => {
		const lines = hist.flatMap((m) => [
			`You: ${m.q}`,
			`Noa/local${m.mocked ? " [MOCK]" : ""}: ${m.a}`,
			"",
		]);
		const blob = new Blob([lines.join("\n")], { type: "text/plain" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "halo-chat.txt";
		a.click();
		URL.revokeObjectURL(url);
	};

	const send = async (): Promise<void> => {
		if (!msg.trim() || sending) return;
		setSending(true);
		setSendError("");
		try {
			const r = await fetchJson("/api/llm/chat", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					message: `${systemPrompt ? `${systemPrompt}\n\n` : ""}${msg}`,
					skill,
					model: model === "none" ? "" : model,
				}),
			});
			const next = [
				...hist,
				{ q: msg, a: String(r.answer ?? ""), mocked: r.mock !== false },
			].slice(-CHAT_CAP);
			setHist(next);
			localStorage.setItem(CHAT_KEY, JSON.stringify(next));
			setMsg("");
		} catch (e) {
			setSendError(`Send failed: ${e}. Is the backend reachable?`);
		} finally {
			setSending(false);
		}
	};

	return (
		<section data-testid="chat-page" className="space-y-3">
			<h1 data-testid="chat-title" className="text-xl font-bold">
				Chat
			</h1>
			<div
				data-testid="chat-controls"
				className="flex flex-wrap items-center gap-2 text-xs text-zinc-400"
			>
				<span>
					{provider} / {model}
				</span>
				<select
					data-testid="personality-select"
					value={personality}
					onChange={(e) => setPersonality(e.target.value)}
					className="rounded border border-zinc-800 bg-zinc-950 px-2 py-1 text-xs outline-none focus:border-amber-500"
				>
					{Object.keys(PERSONALITIES).map((p) => (
						<option key={p} value={p}>
							{p}
						</option>
					))}
				</select>
				{personality === "Custom" && (
					<input
						data-testid="chat-custom-system"
						value={customText}
						onChange={(e) => setCustomText(e.target.value)}
						placeholder="Custom system prompt..."
						className="rounded border border-zinc-800 bg-zinc-950 px-2 py-1 text-xs outline-none focus:border-amber-500"
					/>
				)}
				<span data-testid="chat-skill-first" className="flex gap-1">
					{(skills.length ? skills : [skill]).map((s) => (
						<button
							key={s}
							data-testid={`chat-skill-${s}`}
							onClick={() => setSkill(s)}
							className={`rounded px-1.5 py-0.5 font-mono ${s === skill ? "bg-amber-500/20 text-amber-300" : "bg-zinc-800 text-zinc-500"}`}
						>
							skill:{s}
						</button>
					))}
				</span>
			</div>
			<Card testId="chat-messages">
				<div className="max-h-96 space-y-3 overflow-y-auto">
					{hist.length === 0 && (
						<div className="text-sm text-zinc-500">
							No messages yet - ask about Halo, Lua, or hardware.
						</div>
					)}
					{hist.map((m, i) => (
						<div key={i}>
							<div className="text-sm font-semibold text-amber-300">You</div>
							<div className="text-sm">{m.q}</div>
							<div className="mt-1 flex items-center gap-2 text-sm font-semibold text-blue-300">
								Noa/local
								{m.mocked && (
									<span className="rounded bg-zinc-700 px-1 text-[10px] font-normal text-amber-300">
										MOCK
									</span>
								)}
							</div>
							<div className="whitespace-pre-wrap text-sm text-zinc-300">
								{m.a}
							</div>
						</div>
					))}
				</div>
			</Card>
			{model === "none" && (
				<div
					data-testid="chat-no-model"
					className="rounded border border-amber-700 bg-amber-950 px-3 py-2 text-sm text-amber-200"
				>
					No model selected - open Settings to pick one of your installed Ollama
					models, or the backend will use a loaded one automatically.
				</div>
			)}
			{sendError && (
				<div
					data-testid="chat-error"
					className="rounded border border-red-800 bg-red-950 px-3 py-2 text-sm text-red-200"
				>
					{sendError}
				</div>
			)}
			<div className="flex gap-2">
				<input
					data-testid="chat-input"
					value={msg}
					onChange={(e) => setMsg(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === "Enter" && !e.shiftKey) send();
					}}
					placeholder="Ask Halo/Noa..."
					className="flex-1 rounded border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm outline-none focus:border-amber-500"
				/>
				<button
					data-testid="chat-send"
					disabled={sending || !msg.trim()}
					onClick={send}
					className="flex items-center gap-1 rounded bg-amber-500 px-3 py-2 text-sm font-semibold text-black hover:bg-amber-400 disabled:opacity-40"
				>
					<Send size={15} /> Send
				</button>
			</div>
			<div data-testid="example-prompts" className="flex flex-wrap gap-1.5">
				{EXAMPLE_PROMPTS.map((p) => (
					<button
						key={p}
						onClick={() => setMsg(p)}
						className="rounded border border-zinc-800 bg-zinc-900 px-2 py-1 text-xs text-zinc-300 hover:border-amber-500"
					>
						{p}
					</button>
				))}
			</div>
			<div className="flex items-center gap-2">
				<button
					data-testid="chat-export"
					disabled={hist.length === 0}
					onClick={exportHist}
					className="rounded border border-zinc-700 px-2 py-1 text-xs hover:border-amber-500 disabled:opacity-40"
				>
					Export
				</button>
				<button
					data-testid="chat-clear"
					disabled={hist.length === 0}
					onClick={clearHist}
					className="rounded border border-zinc-700 px-2 py-1 text-xs hover:border-amber-500 disabled:opacity-40"
				>
					Clear
				</button>
				<div
					data-testid="chat-count"
					className="font-mono text-[11px] text-zinc-600"
				>
					{hist.length}/{CHAT_CAP}
				</div>
			</div>
		</section>
	);
}
