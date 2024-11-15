import { Ctx } from "@/canvas/ctx";
import { Draw, type IDraw } from "@/canvas/draw";

interface IDrawGridSettings {
	gridSize: number;
	strokeStyle: CanvasFillStrokeStyles["strokeStyle"];
	lineWidth: CanvasPathDrawingStyles["lineWidth"];
}
const defaultSettings: IDrawGridSettings = {
	gridSize: 10,
	strokeStyle: "#000",
	lineWidth: 0.5,
};

export type TDrawGrid = (settings?: Partial<IDrawGridSettings>) => IDraw;

export const drawGrid: TDrawGrid = (settings) => {
	const s = { ...defaultSettings, ...settings };

	const width = window.innerWidth;
	const height = window.innerHeight;

	Ctx.getCtx().strokeStyle = s.strokeStyle;
	Ctx.getCtx().lineWidth = s.lineWidth;

	for (let x = 0; x <= width; x++) {
		Ctx.getCtx().beginPath();
		Ctx.getCtx().moveTo(x * s.gridSize, 0);
		Ctx.getCtx().lineTo(x * s.gridSize, height * s.gridSize);
		Ctx.getCtx().stroke();
		Ctx.getCtx().closePath();
	}

	for (let y = 0; y <= height; y++) {
		Ctx.getCtx().beginPath();
		Ctx.getCtx().moveTo(0, y * s.gridSize);
		Ctx.getCtx().lineTo(width * s.gridSize, y * s.gridSize);
		Ctx.getCtx().stroke();
		Ctx.getCtx().closePath();
	}

	return Draw;
};
