import { Canvas } from "@/canvas";
import { dataConverter } from "@/dataConverter";
import type { Point, Rect } from "@/models";

// Данные
const rect1: Rect = {
	position: { x: 150, y: 150 },
	size: { width: 50, height: 100 },
};
const cPoint1 = { point: { x: 125, y: 100 }, angle: 90 };

const rect2: Rect = {
	position: { x: 250, y: 75 },
	size: { width: 50, height: 50 },
};
const cPoint2 = { point: { x: 225, y: 50 }, angle: 90 };

// Рендер
function canvasDraw(path: Point[]) {
	Canvas("board").drawGrid().drawRect(rect1).drawRect(rect2).drawPath(path);

	window.requestAnimationFrame(() => canvasDraw(path));
}

// Инит
export async function canvasSetup() {
	const path = await dataConverter({ rect1, rect2, cPoint1, cPoint2 });
	canvasDraw(path);
}
