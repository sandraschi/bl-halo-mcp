import { AnimatePresence, motion } from "framer-motion";
import {
	BookOpen,
	ChevronLeft,
	ChevronRight,
	CircleHelp,
	Cpu,
	ExternalLink,
	FileCode2,
	Glasses,
	Image,
	Inbox,
	LayoutDashboard,
	LayoutGrid,
	Maximize2,
	MessageSquare,
	Minimize2,
	OctagonX,
	Search,
	Settings,
	Terminal,
	Wrench,
	X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { cn } from "../lib/cn";
import { pollHealth, useConnection } from "../store/connection";
import { useToasts } from "../store/toast";
import { HelpModal } from "./HelpModal";
import { Toaster } from "./Toaster";

const NAV = [
	{ to: "/", label: "Dashboard", icon: LayoutDashboard, end: true },
	{ to: "/device", label: "Device", icon: Glasses },
	{ to: "/gallery", label: "Gallery", icon: Image },
	{ to: "/lua", label: "Lua", icon: FileCode2 },
	{ to: "/hardware", label: "Hardware", icon: Cpu },
	{ to: "/tools", label: "Tools", icon: Wrench },
	{ to: "/skills", label: "Skills", icon: BookOpen },
	{ to: "/chat", label: "Chat", icon: MessageSquare },
	{ to: "/apps", label: "Apps Hub", icon: LayoutGrid },
	{ to: "/inbox", label: "Inbox", icon: Inbox },
	{ to: "/logs", label: "Logs", icon: Terminal },
	{ to: "/settings", label: "Settings", icon: Settings },
	{ to: "/help", label: "Help", icon: CircleHelp },
];

const TITLES: Record<string, string> = Object.fromEntries(
	NAV.map((n) => [n.to, n.label]),
);

export function Shell(): React.ReactElement {
	const [collapsed, setCollapsed] = useState(false);
	const [compact, setCompact] = useState(false);
	const [helpOpen, setHelpOpen] = useState(false);
	const [query, setQuery] = useState("");
	const conn = useConnection();
	const push = useToasts((s) => s.push);
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		pollHealth();
		const t = setInterval(pollHealth, 15000);
		return () => clearInterval(t);
	}, []);

	useEffect(() => {
		const onKey = (e: KeyboardEvent): void => {
			if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "l") {
				e.preventDefault();
				navigate("/logs");
			}
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [navigate]);

	useEffect(() => {
		const onWheel = (e: WheelEvent): void => {
			if (!e.ctrlKey) return;
			e.preventDefault();
			const cur = Number(document.documentElement.style.zoom || 1);
			const next = Math.min(
				2,
				Math.max(0.8, cur + (e.deltaY < 0 ? 0.1 : -0.1)),
			);
			document.documentElement.style.zoom = String(next);
		};
		window.addEventListener("wheel", onWheel, { passive: false });
		return () => window.removeEventListener("wheel", onWheel);
	}, []);

	const dot =
		conn.state === "connected"
			? "bg-green-500"
			: conn.state === "connecting"
				? "bg-amber-500 animate-pulse"
				: "bg-red-500";
	const statusLabel =
		conn.state === "connected"
			? `connected ${conn.mock ? "(MOCK)" : "(live)"}`
			: conn.state;

	const disconnect = async (): Promise<void> => {
		try {
			const r = await fetch("/api/shutdown", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ confirm: true }),
			});
			if (r.ok) {
				push("success", "Halo disconnected");
				pollHealth();
			} else {
				push("error", "Disconnect rejected");
			}
		} catch {
			push("error", "Backend unreachable");
		}
	};

	if (compact) {
		return (
			<div className="min-h-screen bg-zinc-950 text-zinc-200">
				<div className="flex items-center gap-2 border-b border-zinc-800 bg-zinc-900/80 px-3 py-2 backdrop-blur">
					<Glasses size={16} className="text-amber-400" />
					<span className="text-sm font-semibold">bl-halo-mcp</span>
					<span
						data-testid="backend-dot"
						className={cn("h-2 w-2 rounded-full", dot)}
						title={statusLabel}
					/>
					<button
						data-testid="compact-expand"
						onClick={() => setCompact(false)}
						title="Restore full UI"
					>
						<Maximize2 size={16} />
					</button>
					<Outlet />
				</div>
			</div>
		);
	}

	return (
		<div className="flex min-h-screen bg-zinc-950 text-zinc-200">
			<motion.aside
				animate={{ width: collapsed ? 64 : 220 }}
				transition={{ type: "spring", stiffness: 400, damping: 40 }}
				className="flex shrink-0 flex-col border-r border-zinc-800 bg-zinc-900/80 backdrop-blur"
			>
				<div className="flex items-center gap-2 px-3 pt-3">
					<Glasses size={22} className="shrink-0 text-amber-400" />
					{!collapsed && (
						<div className="leading-tight">
							<div className="text-sm font-bold">bl-halo-mcp</div>
							<div className="font-mono text-[10px] text-zinc-500">v0.3.0</div>
						</div>
					)}
				</div>
				<button
					data-testid="sidebar-toggle"
					onClick={() => setCollapsed((c) => !c)}
					title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
					className="mx-3 mt-3 flex items-center justify-center rounded border border-zinc-800 p-1 text-zinc-400 hover:text-amber-400"
				>
					{collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
				</button>
				<nav className="mt-2 flex-1 space-y-0.5 overflow-y-auto px-2 pb-3">
					{NAV.map((n) => (
						<NavLink
							key={n.to}
							to={n.to}
							end={n.end}
							data-testid={`nav-${n.label.toLowerCase().replace(/ /g, "-")}`}
							className={({ isActive }) =>
								cn(
									"flex items-center gap-2 rounded px-2 py-1.5 text-sm",
									isActive
										? "bg-amber-500/10 text-amber-400"
										: "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200",
								)
							}
						>
							<n.icon size={17} className="shrink-0" />
							{!collapsed && <span>{n.label}</span>}
						</NavLink>
					))}
				</nav>
				{!collapsed && (
					<div className="border-t border-zinc-800 p-3 text-xs text-zinc-500">
						<div className="flex items-center gap-1.5">
							<span
								data-testid="backend-dot"
								className={cn("h-2 w-2 rounded-full", dot)}
							/>
							<span>{statusLabel}</span>
						</div>
						{conn.lastError && conn.state !== "connected" && (
							<div className="mt-1 truncate font-mono text-[10px] text-red-400">
								{conn.lastError}
							</div>
						)}
					</div>
				)}
			</motion.aside>

			<div className="flex min-w-0 flex-1 flex-col">
				<header
					data-testid="topbar"
					className="flex items-center gap-2 border-b border-zinc-800 bg-zinc-900/80 px-4 py-2 backdrop-blur"
				>
					<h1 className="text-sm font-semibold">
						{TITLES[location.pathname] ?? "Halo"}
					</h1>
					<div className="relative ml-2 hidden sm:block">
						<Search
							size={14}
							className="absolute left-2 top-1/2 -translate-y-1/2 text-zinc-500"
						/>
						<input
							data-testid="topbar-search"
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							onKeyDown={(e) => {
								if (e.key === "Enter")
									navigate(
										`/tools${query ? `?q=${encodeURIComponent(query)}` : ""}`,
									);
							}}
							placeholder="Search tools..."
							className="w-48 rounded border border-zinc-800 bg-zinc-950 py-1 pl-7 pr-2 text-xs outline-none focus:border-amber-500"
						/>
					</div>
					<div className="flex-1" />
					<span
						data-testid="backend-dot"
						className={cn("h-2 w-2 rounded-full", dot)}
						title={statusLabel}
					/>
					<button
						data-testid="topbar-help"
						onClick={() => setHelpOpen(true)}
						title="Help (context)"
					>
						<CircleHelp
							size={17}
							className="text-zinc-400 hover:text-amber-400"
						/>
					</button>
					<button
						data-testid="topbar-logs"
						onClick={() => navigate("/logs")}
						title="Logs (Ctrl+L)"
					>
						<Terminal
							size={17}
							className="text-zinc-400 hover:text-amber-400"
						/>
					</button>
					<button
						data-testid="companion-toggle"
						onClick={() => setCompact(true)}
						title="Companion mode"
					>
						<Minimize2
							size={17}
							className="text-zinc-400 hover:text-amber-400"
						/>
					</button>
					<button
						data-testid="pop-out"
						onClick={() => window.open(window.location.href, "_blank")}
						title="Pop out"
					>
						<ExternalLink
							size={17}
							className="text-zinc-400 hover:text-amber-400"
						/>
					</button>
					<button
						data-testid="emergency-stop"
						onClick={disconnect}
						title="Disconnect Halo session"
						className="flex items-center gap-1 rounded bg-red-600 px-2 py-1 text-xs font-semibold text-white hover:bg-red-500"
					>
						<OctagonX size={14} /> Stop
					</button>
				</header>

				<main className="min-w-0 flex-1 p-4">
					<motion.div
						key={location.pathname}
						initial={{ opacity: 0, y: 6 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.18 }}
					>
						<Outlet />
					</motion.div>
				</main>
			</div>

			<AnimatePresence>
				{helpOpen && <HelpModal onClose={() => setHelpOpen(false)} />}
			</AnimatePresence>
			<Toaster />
		</div>
	);
}

export function DismissX({
	onClick,
}: { onClick: () => void }): React.ReactElement {
	return (
		<button onClick={onClick} className="text-zinc-500 hover:text-zinc-200">
			<X size={14} />
		</button>
	);
}
