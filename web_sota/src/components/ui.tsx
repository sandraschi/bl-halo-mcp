import { Loader2 } from "lucide-react";
import type { ReactElement, ReactNode } from "react";
import { cn } from "../lib/cn";

export function PageLoading({
	label,
	testId,
}: { label: string; testId?: string }): ReactElement {
	return (
		<div
			data-testid={testId ?? "page-loading"}
			role="status"
			aria-busy="true"
			className="flex items-center gap-2 p-8 text-sm text-zinc-400"
		>
			<Loader2 size={16} className="animate-spin text-blue-400" />
			{label}...
		</div>
	);
}

export function Card({
	children,
	className,
	testId,
}: { children: ReactNode; className?: string; testId?: string }): ReactElement {
	return (
		<div
			data-testid={testId}
			className={cn(
				"rounded-lg border border-zinc-800 bg-zinc-900/60 p-4",
				className,
			)}
		>
			{children}
		</div>
	);
}

export function Loading({ what }: { what: string }): ReactElement {
	return (
		<div data-testid="loading" className="text-sm text-zinc-500">
			{what} loading...
		</div>
	);
}

export function Err({ msg }: { msg: string }): ReactElement | null {
	if (!msg) return null;
	return (
		<div
			data-testid="error"
			className="rounded border border-red-800 bg-red-950 px-3 py-2 text-sm text-red-200"
		>
			{msg}
		</div>
	);
}

export function Kpi({
	testId,
	label,
	value,
	badge,
}: {
	testId: string;
	label: string;
	value: string;
	badge?: ReactNode;
}): ReactElement {
	return (
		<Card testId={testId}>
			<div className="font-mono text-2xl font-semibold text-zinc-100">
				{value} {badge}
			</div>
			<div className="mt-1 text-xs text-zinc-500">{label}</div>
		</Card>
	);
}
