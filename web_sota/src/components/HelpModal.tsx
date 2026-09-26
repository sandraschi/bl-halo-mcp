import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { DismissX } from "./Shell";

export function HelpModal({
	onClose,
}: { onClose: () => void }): React.ReactElement {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			data-testid="help-modal"
			className="fixed inset-0 z-40 flex items-center justify-center bg-black/60 p-4"
			onClick={onClose}
		>
			<div
				className="w-full max-w-md rounded-lg border border-zinc-800 bg-zinc-900 p-4 backdrop-blur"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="mb-2 flex items-center justify-between">
					<h2 className="font-semibold">Halo bridge - quick help</h2>
					<DismissX onClick={onClose} />
				</div>
				<ul className="list-disc space-y-1 pl-5 text-sm text-zinc-300">
					<li>
						No hardware? Everything rehearses in MOCK - nothing is fake-live.
					</li>
					<li>
						Glasses nearby? Set BL_HALO_MOCK=false + MAC, then Device - Connect.
					</li>
					<li>
						Need AI answers? Paste a Noa preview key into NOA_API_KEY (.env).
					</li>
					<li>HUD is 256x256 drawable - keep text short.</li>
				</ul>
				<Link
					to="/help"
					onClick={onClose}
					data-testid="help-modal-full"
					className="mt-3 inline-block text-sm text-amber-400 hover:underline"
				>
					Open full Help page
				</Link>
			</div>
		</motion.div>
	);
}
