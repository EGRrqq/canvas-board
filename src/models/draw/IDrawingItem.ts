import type { IDrawTool, TDrawType } from "@/canvas/methods/Draw";

export interface IDrawingItem<TT extends TDrawType> {
	id: string;
	activeTool: TDrawType;
	tool: IDrawTool<TT>;
	// boundElem: Pick<IDrawingItem<TT>, "id">[];
}
