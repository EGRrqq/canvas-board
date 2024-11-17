import type { IDrawRectSettings } from "@/canvas";
import type { IDrawPathSettings } from "@/canvas/draw";
import type { Point, Size } from "@/models/base";

type IToolSettingsMap = {
	rect: IDrawRectSettings;
	line: IDrawPathSettings;
};
type TToolType = keyof IToolSettingsMap;

export interface ITool<TT extends TToolType> {
	type: TT;
	settings: IToolSettingsMap[TT];
}

export interface IDrawingItem<TT extends TToolType> {
	id: string;
	tool: ITool<TT>;
	boundElem: Pick<IDrawingItem<TT>, "id">[];
	point: Point;
	size: Size;
}
