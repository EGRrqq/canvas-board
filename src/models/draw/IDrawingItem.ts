import type { IDrawTool, TDrawType } from "@/canvas/methods/Draw";

export interface IDrawingItem<TT extends TDrawType> {
	id: string;
	tool: IDrawTool<TT>;
}
