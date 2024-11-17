import { type TDrawGrid, drawGrid } from "@/canvas/methods/Draw/drawGrid";
import { type TDrawPath, drawPath } from "@/canvas/methods/Draw/drawPath";
import { type TDrawRect, drawRect } from "@/canvas/methods/Draw/drawRect";

// Интерфейс для контроллера
export interface IDraw {
	drawRect: TDrawRect;
	drawGrid: TDrawGrid;
	drawPath: TDrawPath;
}

// Контроллер
export const Draw: IDraw = {
	drawRect,
	drawGrid,
	drawPath,
};

// Настройки
export type { IDrawGridSettings } from "@/canvas/methods/Draw/drawGrid";
export type { IDrawRectSettings } from "@/canvas/methods/Draw/drawRect";
export type { IDrawPathSettings } from "@/canvas/methods/Draw/drawPath";
