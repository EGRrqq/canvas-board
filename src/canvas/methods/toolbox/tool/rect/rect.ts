import { type IMethods, Methods } from "@/canvas/methods";
import { updateSettings } from "@/canvas/methods/settings";
import { Handlers } from "@/canvas/methods/toolbox/tool/handlers";

type IToolMethods<T> = () => IMethods & T;
export interface IToolRaw {
	rectHover: () => IToolMethods<Pick<IToolRaw, "rectClick">>;
	rectClick: () => IToolMethods<Pick<IToolRaw, "rectHover">>;
}

// let points = []; // Массив для хранения точек
let isDrawEnded = false;

export const rectHover: IToolRaw["rectHover"] = () => {
	const { mouseMove } = Handlers.getMouseHandlers();
	isDrawEnded = false;

	// if (!isDrawEnded && mouseMove.e && (mouseMove.flag || points.length)) {
	// }

	if (!isDrawEnded && mouseMove.e) {
		updateSettings({ css: { cursor: "crosshair" } });
	}

	return { ...Methods };
};
