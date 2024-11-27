import { Storage } from "@/canvas/methods/storage";
import type { IDrawingItem } from "@/models";

export const getRectDrawings = () => {
	const d = getStorageRectData();
	return d ? d : [];
};

const getStorageRectData = () =>
	Storage.getDrawings()?.filter(
		(i) => i.tool.type === "rect",
	) as IDrawingItem<"rect">[];
