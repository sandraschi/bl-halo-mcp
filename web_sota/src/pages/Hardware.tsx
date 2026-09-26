import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
import { Card, Err } from "../components/ui";

export const OFFICIAL_STL = "https://docs.brilliant.xyz/halo/halo.stl";

const SPECS: Array<[string, string]> = [
	[
		"MCU + NPU",
		"Balletto B1 (Alif): Cortex-M55 + Ethos-U55, 1.8 MB MRAM, 2 MB SRAM",
	],
	["OS", "Zephyr OS + Lua 5.4 VM, OTA via MCUboot over BLE"],
	["Radio", "Bluetooth LE 5.3 (Halo Lua, Battery, OTA, LE Audio)"],
	[
		"Display",
		"0.2 in 640x480 RGB microOLED, 256x256 drawable, immediate draw (no show())",
	],
	["Camera", "PAG7982J1 VGA global shutter, 81.2 deg HFOV, libmpix pipeline"],
	["Microphones", "Dual TDK T5838, always-on audio-activity wake"],
	[
		"Speakers",
		"Bone conduction via TI TPA2011D1, PCM/LC3 over dedicated AUDIO TX",
	],
	["IMU", "BMA580 accel (tap interrupts) + QMC6308 compass"],
	["Power", "2x150 mAh (300 mAh), BQ25170 charger, magnetic USB-C"],
	["Weight", "~40 g"],
];

function StlViewer(): React.ReactElement {
	const mountRef = useRef<HTMLDivElement>(null);
	const sceneRef = useRef<THREE.Scene | null>(null);
	const [url, setUrl] = useState(OFFICIAL_STL);
	const [status, setStatus] = useState("idle");
	const [error, setError] = useState("");
	const [faces, setFaces] = useState<number | null>(null);

	useEffect(() => {
		const mount = mountRef.current;
		if (!mount) return;
		const scene = new THREE.Scene();
		scene.background = new THREE.Color(0x09090b);
		const camera = new THREE.PerspectiveCamera(
			45,
			mount.clientWidth / 400,
			0.1,
			10000,
		);
		camera.position.set(60, 40, 120);
		const renderer = new THREE.WebGLRenderer({ antialias: true });
		renderer.setSize(mount.clientWidth, 400);
		mount.appendChild(renderer.domElement);
		const controls = new OrbitControls(camera, renderer.domElement);
		controls.autoRotate = true;
		controls.autoRotateSpeed = 1.2;
		scene.add(new THREE.HemisphereLight(0xffffff, 0x27272a, 1.2));
		const dir = new THREE.DirectionalLight(0xf59e0b, 1.0);
		dir.position.set(80, 120, 60);
		scene.add(dir);
		sceneRef.current = scene;
		let alive = true;
		const tick = (): void => {
			if (!alive) return;
			requestAnimationFrame(tick);
			controls.update();
			renderer.render(scene, camera);
		};
		tick();
		const onResize = (): void => {
			renderer.setSize(mount.clientWidth, 400);
			camera.aspect = mount.clientWidth / 400;
			camera.updateProjectionMatrix();
		};
		window.addEventListener("resize", onResize);
		(mount as HTMLDivElement & { __scene?: THREE.Scene }).__scene = scene;
		return () => {
			alive = false;
			window.removeEventListener("resize", onResize);
			renderer.dispose();
			mount.removeChild(renderer.domElement);
			sceneRef.current = null;
		};
	}, []);

	const showGeometry = (geometry: THREE.BufferGeometry): void => {
		const scene = sceneRef.current;
		if (!scene) return;
		const old = scene.getObjectByName("halo-model");
		if (old) {
			scene.remove(old);
			(old as THREE.Mesh).geometry.dispose();
		}
		geometry.computeBoundingBox();
		const box = geometry.boundingBox;
		if (box) {
			const center = box.getCenter(new THREE.Vector3());
			geometry.translate(-center.x, -center.y, -center.z);
		}
		const mat = new THREE.MeshStandardMaterial({
			color: 0xf59e0b,
			metalness: 0.35,
			roughness: 0.5,
		});
		const mesh = new THREE.Mesh(geometry, mat);
		mesh.name = "halo-model";
		scene.add(mesh);
		const tris =
			(geometry.index?.count ?? geometry.attributes.position.count) / 3;
		setFaces(Math.round(tris));
	};

	const loadUrl = async (): Promise<void> => {
		setError("");
		setStatus("loading (large assembly - may take a while)...");
		try {
			const loader = new STLLoader();
			const geometry = await loader.loadAsync(url);
			showGeometry(geometry);
			setStatus("loaded");
		} catch (e) {
			setStatus("failed");
			setError(
				`URL load failed (${e}). The docs host may block cross-origin reads - download the STL and use the file picker instead.`,
			);
		}
	};

	const loadFile = async (file: File): Promise<void> => {
		setError("");
		setStatus(`loading ${file.name}...`);
		try {
			const buf = await file.arrayBuffer();
			const geometry = new STLLoader().parse(buf);
			showGeometry(geometry);
			setStatus("loaded");
		} catch (e) {
			setStatus("failed");
			setError(`Could not parse STL: ${e}`);
		}
	};

	return (
		<Card testId="stl-viewer">
			<div className="mb-2 flex flex-wrap items-center gap-2">
				<input
					data-testid="stl-url"
					value={url}
					onChange={(e) => setUrl(e.target.value)}
					spellCheck={false}
					className="min-w-0 flex-1 rounded border border-zinc-800 bg-zinc-950 px-2 py-1.5 font-mono text-xs outline-none focus:border-amber-500"
				/>
				<button
					data-testid="stl-load"
					onClick={loadUrl}
					className="rounded bg-amber-500 px-3 py-1.5 text-xs font-semibold text-black hover:bg-amber-400"
				>
					Load URL
				</button>
				<label className="cursor-pointer rounded border border-zinc-700 px-3 py-1.5 text-xs hover:border-amber-500">
					Open .stl file
					<input
						data-testid="stl-file"
						type="file"
						accept=".stl"
						className="hidden"
						onChange={(e) => {
							const f = e.target.files?.[0];
							if (f) loadFile(f);
						}}
					/>
				</label>
			</div>
			<div
				ref={mountRef}
				data-testid="stl-canvas"
				className="h-[400px] w-full overflow-hidden rounded border border-zinc-800"
			/>
			<div
				data-testid="stl-status"
				className="mt-1 font-mono text-[11px] text-zinc-500"
			>
				{status}
				{faces !== null
					? ` - ${faces.toLocaleString()} triangles (drag to orbit, scroll to zoom)`
					: " - drag to orbit, scroll to zoom"}
			</div>
			<Err msg={error} />
		</Card>
	);
}

export function Hardware(): React.ReactElement {
	return (
		<section className="space-y-4">
			<h1 data-testid="hardware-title" className="text-xl font-bold">
				Hardware
			</h1>
			<Card testId="hardware-specs">
				<table className="w-full text-sm">
					<tbody>
						{SPECS.map(([k, v]) => (
							<tr key={k} className="border-b border-zinc-800/50">
								<td className="py-1.5 pr-3 font-semibold text-zinc-300">{k}</td>
								<td className="py-1.5 text-zinc-400">{v}</td>
							</tr>
						))}
					</tbody>
				</table>
			</Card>
			<div className="text-sm">
				<a
					data-testid="stl-download"
					href={OFFICIAL_STL}
					target="_blank"
					rel="noreferrer"
					className="text-amber-400 hover:underline"
				>
					Download the official full-assembly STL (docs.brilliant.xyz)
				</a>
				<span className="text-zinc-500">
					{" "}
					- front, lenses, temple arms (open). No official CAD sources or
					firmware repo exist yet.
				</span>
			</div>
			<StlViewer />
			<Card testId="hardware-safety">
				<div className="text-sm font-semibold">
					Safety (abridged from Brilliant)
				</div>
				<p className="mt-1 text-xs text-zinc-400">
					Not for driving/machinery operation; eye strain, headache, motion
					sickness possible; flashing images unsuitable for photosensitive
					users. Consumer/R&amp;D grade, not critical/health use. Li-ion: no
					heat/fire/liquid, do not remove cells, e-waste disposal.
				</p>
			</Card>
		</section>
	);
}
