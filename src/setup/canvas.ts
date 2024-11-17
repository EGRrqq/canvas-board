import { Canvas } from "@/canvas";
import type { TBoard } from "@/canvas/board";
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
function canvasDraw(brd: ReturnType<TBoard>, path: Point[]) {
	brd
		.clear()
		.scale()
		.updateSettings({ bgColor: "#fff" })
		.drawGrid()
		.drawRect(rect1)
		.drawRect(rect2)
		.drawPath(path);

	window.requestAnimationFrame(() => canvasDraw(brd, path));
}

// Инит
export async function canvasSetup() {
	// Возможно придется двигать path в canvasDraw функцию
	// - когда интерактивность появиться
	// - нужно двигать с флагом на рендер вместе, чтобы постоянно пересчета не было
	const brd = Canvas("board");

	const path = await dataConverter({ rect1, rect2, cPoint1, cPoint2 });
	canvasDraw(brd, path);
}
