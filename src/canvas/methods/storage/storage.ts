import type { IDrawingItem } from "@/models";
import type { TToolType } from "@/models/ui/IDrawingItem";

const ID = "canvas-board";

export type TSave = <TT extends TToolType>(item: IDrawingItem<TT>) => void;
export type TLoad = <TT extends TToolType>() => IDrawingItem<TT>[] | null;

export const save: TSave = (item) => {
	const loadedItems = load();
	if (loadedItems) {
		localStorage.setItem(ID, JSON.stringify([...loadedItems, item]));
		return;
	}

	localStorage.setItem(ID, JSON.stringify([item]));
};

export const load: TLoad = () => {
	const tool = localStorage.getItem(ID);
	return tool ? JSON.parse(tool) : null;
};
