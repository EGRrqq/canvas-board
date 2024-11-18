import { Canvas } from "@/canvas";
import type { TBoard } from "@/canvas/board";
import { dataConverter } from "@/dataConverter";
import type { Point } from "@/models";
import * as Mock from "@/setup/mockData";

// Рендер
function canvasDraw(brd: ReturnType<TBoard>, path: Point[]) {
	brd
		.clear()
		.scale()
		.updateSettings({ bgColor: "#fff" })
		.loadDrawings()
		.grid(null)
		.rect({ rect: Mock.rect1 })
		.rect({ rect: Mock.rect2 })
		.line({ path });

	window.requestAnimationFrame(() => canvasDraw(brd, path));
}

// Инит
export async function canvasSetup() {
	// Получаем доступ к канвасу
	const brd = Canvas("board");
	// Активируем дефолтный инструмент
	// brd.getActiveTool().activate();

	// Возможно придется двигать path в canvasDraw функцию
	// - когда интерактивность появиться
	// - нужно двигать с флагом на рендер вместе, чтобы постоянно пересчета не было
	const path = await dataConverter({
		rect1: Mock.rect1,
		rect2: Mock.rect2,
		cPoint1: Mock.cPoint1,
		cPoint2: Mock.cPoint2,
	});
	canvasDraw(brd, path);
}
