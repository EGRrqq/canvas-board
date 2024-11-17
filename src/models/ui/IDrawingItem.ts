import type { IDrawPathSettings, IDrawRectSettings } from "@/canvas";
import type { Point, Size } from "@/models/base";

type IToolSettingsMap = {
	rect: IDrawRectSettings;
	line: IDrawPathSettings;
};
export type TToolType = keyof IToolSettingsMap;

export interface ITool<TT extends TToolType> {
	type: TT;
	settings: IToolSettingsMap[TT];
}

export interface IDrawingItem<TT extends TToolType> {
	id: string;
	tool: ITool<TT>;
	boundElem: Pick<IDrawingItem<TT>, "id">[];
	position: Point;
	size: Size;
}
