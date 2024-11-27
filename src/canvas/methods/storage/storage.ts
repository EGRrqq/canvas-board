import { Methods, type TMethods } from "@/canvas/methods";
import { Draw, type TDrawType } from "@/canvas/methods/Draw";
import type { IDrawingItem } from "@/models";

const ID = "canvas-drawings";

export type TSave = <TT extends TDrawType>(item: IDrawingItem<TT>) => TMethods;
export type TLoad = () => TMethods;
type TGet = <TT extends TDrawType>() => IDrawingItem<TT>[] | null;

export const saveDrawing: TSave = (item) => {
	const loadedItems = getDrawings();
	if (loadedItems) {
		localStorage.setItem(ID, JSON.stringify([...loadedItems, item]));
		return Methods;
	}

	localStorage.setItem(ID, JSON.stringify([item]));

	return Methods;
};

export const loadDrawings: TLoad = () => {
	const items = getDrawings();

	if (items) {
		for (const i of items) {
			const tool = Draw[i.tool.type];
			if (!tool) throw Error(`'${i.tool.type}' инструмент не найден`);

			tool(i.tool.data, i.tool.settings);
		}
	}

	return Methods;
};

export const getDrawings: TGet = () => {
	const tool = localStorage.getItem(ID);
	return tool ? JSON.parse(tool) : null;
};
