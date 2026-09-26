import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Err, PageLoading } from "../components/ui";
import { fetchJson } from "../lib/api";
import { useToasts } from "../store/toast";

export const DESTRUCTIVE_CONFIRM_LABEL =
	"I understand this disconnects the glasses";

interface Prop {
	type?: string;
	enum?: string[];
	default?: unknown;
	description?: string;
}

function Field({
	name,
	schema,
	required,
	value,
	onChange,
}: {
	name: string;
	schema: Prop;
	required: boolean;
	value: unknown;
	onChange: (v: unknown) => void;
}): React.ReactElement {
	const label = `${name}${required ? " *" : ""}`;
	if (schema.enum) {
		return (
			<label className="block text-sm">
				<span className="text-zinc-400">{label}</span>
				<select
					data-testid={`field-${name}`}
					value={String(value ?? schema.enum[0] ?? "")}
					onChange={(e) => onChange(e.target.value)}
					className="mt-1 w-full rounded border border-zinc-800 bg-zinc-950 px-2 py-1.5 text-sm outline-none focus:border-amber-500"
				>
					{schema.enum.map((o) => (
						<option key={o} value={o}>
							{o}
						</option>
					))}
				</select>
				{schema.description && (
					<span className="text-xs text-zinc-500">{schema.description}</span>
				)}
			</label>
		);
	}
	if (schema.type === "boolean") {
		return (
			<label className="flex items-center gap-2 text-sm">
				<input
					data-testid={`field-${name}`}
					type="checkbox"
					checked={Boolean(value)}
					onChange={(e) => onChange(e.target.checked)}
				/>
				<span>{schema.description ?? label}</span>
			</label>
		);
	}
	if (schema.type === "number" || schema.type === "integer") {
		return (
			<label className="block text-sm">
				<span className="text-zinc-400">{label}</span>
				<input
					data-testid={`field-${name}`}
					type="number"
					value={String(value ?? schema.default ?? "")}
					onChange={(e) =>
						onChange(e.target.value === "" ? "" : Number(e.target.value))
					}
					className="mt-1 w-full rounded border border-zinc-800 bg-zinc-950 px-2 py-1.5 font-mono text-sm outline-none focus:border-amber-500"
				/>
				{schema.description && (
					<span className="text-xs text-zinc-500">{schema.description}</span>
				)}
			</label>
		);
	}
	return (
		<label className="block text-sm">
			<span className="text-zinc-400">{label}</span>
			<textarea
				data-testid={`field-${name}`}
				value={String(value ?? "")}
				onChange={(e) => onChange(e.target.value)}
				rows={name === "text" ? 3 : 1}
				className="mt-1 w-full rounded border border-zinc-800 bg-zinc-950 px-2 py-1.5 font-mono text-sm outline-none focus:border-amber-500"
			/>
			{schema.description && (
				<span className="text-xs text-zinc-500">{schema.description}</span>
			)}
		</label>
	);
}

export function ToolRunner(): React.ReactElement {
	const { name } = useParams();
	const push = useToasts((s) => s.push);
	const [schema, setSchema] = useState<{
		description?: string;
		parameters?: { properties?: Record<string, Prop>; required?: string[] };
	} | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [args, setArgs] = useState<Record<string, unknown>>({});
	const [result, setResult] = useState("");
	const [running, setRunning] = useState(false);
	const [confirmed, setConfirmed] = useState(false);

	useEffect(() => {
		setLoading(true);
		fetchJson(`/api/tools/${name}`, undefined, 1)
			.then((j) => {
				setSchema(j.tool);
				const init: Record<string, unknown> = {};
				const props = j.tool?.parameters?.properties ?? {};
				for (const [k, v] of Object.entries<Prop>(props)) {
					if (v.enum) init[k] = v.enum[0];
					else if (v.default !== undefined) init[k] = v.default;
				}
				setArgs(init);
			})
			.catch((e) => setError(String(e?.message ?? e)))
			.finally(() => setLoading(false));
	}, [name]);

	if (loading)
		return <PageLoading label="Tool schema" testId="tool-runner-loading" />;
	const props = schema?.parameters?.properties ?? {};
	const required: string[] = schema?.parameters?.required ?? [];
	const destructive = name === "halo_shutdown";

	const run = async (): Promise<void> => {
		setRunning(true);
		try {
			const clean: Record<string, unknown> = {};
			for (const [k, v] of Object.entries(args)) {
				if (v === "" && !required.includes(k)) continue;
				clean[k] = v;
			}
			const j = await fetchJson(`/api/tools/${name}`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ arguments: clean }),
			});
			setResult(JSON.stringify(j.result ?? j, null, 2));
			push(
				j.result?.success === false || j.error ? "error" : "success",
				`${name} finished`,
			);
		} catch (e) {
			setResult(String(e));
			push("error", `${name} failed`);
		} finally {
			setRunning(false);
		}
	};

	return (
		<section className="space-y-3">
			<h1 className="font-mono text-xl font-bold">{name}</h1>
			{schema?.description && (
				<p className="text-sm text-zinc-400">{schema.description}</p>
			)}
			<Err msg={error} />
			<Card>
				<div className="space-y-3">
					{Object.entries(props).map(([k, v]) => (
						<Field
							key={k}
							name={k}
							schema={v}
							required={required.includes(k)}
							value={args[k]}
							onChange={(nv) => setArgs((a) => ({ ...a, [k]: nv }))}
						/>
					))}
					{destructive && (
						<label className="flex items-center gap-2 text-sm text-red-300">
							<input
								data-testid="destructive-confirm"
								type="checkbox"
								checked={confirmed}
								onChange={(e) => setConfirmed(e.target.checked)}
							/>
							{DESTRUCTIVE_CONFIRM_LABEL}
						</label>
					)}
					<button
						data-testid="tool-runner-run"
						disabled={running || (destructive && !confirmed)}
						onClick={run}
						className="rounded bg-amber-500 px-3 py-1.5 text-sm font-semibold text-black hover:bg-amber-400 disabled:opacity-40"
					>
						{running ? "Running..." : "Run"}
					</button>
				</div>
			</Card>
			{result && (
				<Card testId="tool-runner-result">
					<pre className="max-h-96 overflow-auto font-mono text-xs text-zinc-300">
						{result}
					</pre>
				</Card>
			)}
		</section>
	);
}
