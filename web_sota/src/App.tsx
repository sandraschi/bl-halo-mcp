import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Shell } from "./components/Shell";
import { AppsHub } from "./pages/AppsHub";
import { Chat } from "./pages/Chat";
import { Dashboard } from "./pages/Dashboard";
import { Device, Gallery, Lua } from "./pages/Domain";
const Hardware = lazy(() =>
	import("./pages/Hardware").then((m) => ({ default: m.Hardware })),
);
import { Help } from "./pages/Help";
import { Inbox } from "./pages/Inbox";
import { Logs } from "./pages/Logs";
import { Settings } from "./pages/Settings";
import { Skills } from "./pages/Skills";
import { ToolRunner } from "./pages/ToolRunner";
import { Tools } from "./pages/Tools";

export default function App(): React.ReactElement {
	return (
		<Routes>
			<Route element={<Shell />}>
				<Route index element={<Dashboard />} />
				<Route path="dashboard" element={<Dashboard />} />
				<Route path="device" element={<Device />} />
				<Route path="gallery" element={<Gallery />} />
				<Route path="lua" element={<Lua />} />
				<Route
					path="hardware"
					element={
						<Suspense
							fallback={
								<div className="p-8 text-sm text-zinc-500">
									Loading 3D viewer...
								</div>
							}
						>
							<Hardware />
						</Suspense>
					}
				/>
				<Route path="tools" element={<Tools />} />
				<Route path="tools/:name" element={<ToolRunner />} />
				<Route path="skills" element={<Skills />} />
				<Route path="chat" element={<Chat />} />
				<Route path="apps" element={<AppsHub />} />
				<Route path="inbox" element={<Inbox />} />
				<Route path="logs" element={<Logs />} />
				<Route path="settings" element={<Settings />} />
				<Route path="help" element={<Help />} />
				<Route path="*" element={<Navigate to="/" replace />} />
			</Route>
		</Routes>
	);
}
