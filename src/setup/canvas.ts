import { Canvas } from "@/canvas";
import type { TBoard } from "@/canvas/board";

// Рендер
function canvasRect(brd: ReturnType<TBoard>) {
	brd.clear().scale().updateSettings({ bgColor: "#fff" }).setActiveTool("rect");

	window.requestAnimationFrame(() => canvasRect(brd));
}

// Инит
export async function canvasSetup() {
	// Получаем доступ к канвасу
	const brd = Canvas("board");

	canvasRect(brd);
}
