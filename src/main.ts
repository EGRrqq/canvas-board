import "style.css";

import { Canvas } from "@/canvas";
import type { Rect } from "./models";

const rect1: Rect = {
	position: { x: 100, y: 100 },
	size: { width: 100, height: 50 },
};

const rect2: Rect = {
	position: { x: 150, y: 50 },
	size: { width: 50, height: 50 },
};

window.addEventListener("load", canvasSetup, { once: true });
window.addEventListener("resize", canvasSetup, { once: true });

function canvasSetup() {
	Canvas("board", { alpha: true }).drawGrid().drawRect(rect1).drawRect(rect2);

	window.requestAnimationFrame(canvasSetup);
}
