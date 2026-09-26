import { CheckCircle2, Info, XCircle } from "lucide-react";
import { useToasts } from "../store/toast";
import { DismissX } from "./Shell";

const ICON = { success: CheckCircle2, error: XCircle, info: Info };
const COLOR = {
	success: "border-green-700 bg-green-950 text-green-200",
	error: "border-red-700 bg-red-950 text-red-200",
	info: "border-zinc-700 bg-zinc-900 text-zinc-200",
};

export function Toaster(): React.ReactElement {
	const items = useToasts((s) => s.items);
	const dismiss = useToasts((s) => s.dismiss);
	return (
		<div
			data-testid="toaster"
			className="fixed bottom-4 right-4 z-50 space-y-2"
		>
			{items.map((t) => {
				const Icon = ICON[t.kind];
				return (
					<div
						key={t.id}
						className={`flex items-center gap-2 rounded border px-3 py-2 text-sm backdrop-blur ${COLOR[t.kind]}`}
					>
						<Icon size={15} />
						<span>{t.msg}</span>
						<DismissX onClick={() => dismiss(t.id)} />
					</div>
				);
			})}
		</div>
	);
}
