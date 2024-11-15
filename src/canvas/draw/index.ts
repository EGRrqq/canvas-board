import { drawGrid, type TDrawGrid } from "@/canvas/draw/drawGrid";
import { drawRect, type TDrawRect } from "@/canvas/draw/drawRect";

export interface IDraw {
	drawRect: TDrawRect;
	drawGrid: TDrawGrid;
}

export const Draw: IDraw = {
	drawRect,
	drawGrid,
};
