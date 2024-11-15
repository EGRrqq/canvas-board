import { type TDrawGrid, drawGrid } from "@/canvas/draw/drawGrid";
import { type TDrawPath, drawPath } from "@/canvas/draw/drawPath";
import { type TDrawRect, drawRect } from "@/canvas/draw/drawRect";

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
export type { IDrawGridSettings } from "@/canvas/draw/drawGrid";
export type { IDrawRectSettings } from "@/canvas/draw/drawRect";
export type { IDrawPathSettings } from "@/canvas/draw/drawPath";
