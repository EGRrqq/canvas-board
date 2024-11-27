import { Canvas } from "@/canvas";
import type { TBoard } from "@/canvas/board";
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
		.rect({ rect: Mock.headRect })
		.rect({ rect: Mock.topRect })
		.rect({ rect: Mock.bodyRect })
		.rect({ rect: Mock.legLRect })
		.rect({ rect: Mock.legRRect })
		.rect({ rect: Mock.leftTopRect })
		.rect({ rect: Mock.rightTopRect })
		.rect({ rect: Mock.leftTCornerRect })
		.rect({ rect: Mock.rightTCornerRect })
		.rect({ rect: Mock.leftBCornerRect })
		.rect({ rect: Mock.rightBCornerRect })
		.line({ path: Mock.leftCornerPathB })
		.line({ path: Mock.leftCornerPathR })
		.line({ path: Mock.rightCornerPathR })
		.line({ path: Mock.rightCornerPathB })
		.line({ path: Mock.leftBottomCornerPathU })
		.line({ path: Mock.rightBottomCornerPathU });

	window.requestAnimationFrame(() => canvasDraw(brd, path));
}

// Инит
export async function canvasSetup() {
	// Получаем доступ к канвасу
	const brd = Canvas("board");

	canvasDraw(brd, []);
}
