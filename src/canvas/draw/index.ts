import { type TDrawGrid, drawGrid } from "@/canvas/draw/drawGrid";
import { type TDrawRect, drawRect } from "@/canvas/draw/drawRect";

// Интерфейс для контроллера
export interface IDraw {
	drawRect: TDrawRect;
	drawGrid: TDrawGrid;
}

// Контроллер
export const Draw: IDraw = {
	drawRect,
	drawGrid,
};

// Настройки
export type { IDrawGridSettings } from "@/canvas/draw/drawGrid";
export type { IDrawRectSettings } from "@/canvas/draw/drawRect";
