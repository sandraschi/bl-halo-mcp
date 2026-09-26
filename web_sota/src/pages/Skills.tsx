import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Card, Err, PageLoading } from "../components/ui";
import { fetchJson, useAsync } from "../lib/api";

export function Skills(): React.ReactElement {
	const skills = useAsync(() => fetchJson("/api/skills", undefined, 1));
	const [open, setOpen] = useState<string | null>(null);
	const [md, setMd] = useState("");
	const [loadingMd, setLoadingMd] = useState(false);
	const list: Array<{ name: string; uri: string }> = skills.data?.skills ?? [];
	if (skills.loading && list.length === 0)
		return <PageLoading label="Skills" />;
	const openSkill = async (name: string): Promise<void> => {
		if (open === name) {
			setOpen(null);
			return;
		}
		setOpen(name);
		setLoadingMd(true);
		try {
			const j = await fetchJson(`/api/skills/${name}`, undefined, 1);
			setMd(String(j.markdown ?? ""));
		} catch (e) {
			setMd(`Failed to load: ${e}`);
		} finally {
			setLoadingMd(false);
		}
	};
	return (
		<section className="space-y-3">
			<h1 data-testid="skills-title" className="text-xl font-bold">
				Skills
			</h1>
			<Err msg={skills.error} />
			<div data-testid="skills-list" className="grid gap-3 md:grid-cols-2">
				{list.map((s) => (
					<Card key={s.name}>
						<div className="font-mono text-sm font-semibold text-amber-400">
							skill:{s.name}
						</div>
						<div className="mt-1 font-mono text-[11px] text-zinc-500">
							{s.uri}
						</div>
						<button
							data-testid="skills-open"
							onClick={() => openSkill(s.name)}
							className="mt-2 rounded border border-zinc-700 px-2 py-1 text-xs hover:border-amber-500"
						>
							{open === s.name ? "Close SKILL.md" : "Open SKILL.md"}
						</button>
					</Card>
				))}
			</div>
			{open && (
				<Card testId="skills-body">
					{loadingMd ? (
						<PageLoading label="SKILL.md" />
					) : (
						<div className="prose prose-invert prose-sm max-w-none">
							<ReactMarkdown>{md}</ReactMarkdown>
						</div>
					)}
				</Card>
			)}
		</section>
	);
}
