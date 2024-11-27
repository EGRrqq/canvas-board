import { type IMethods, Methods } from "@/canvas/methods";
import { updateSettings } from "@/canvas/methods/settings";
import { Handlers } from "@/canvas/methods/toolbox/tool/handlers";

interface IRect {
	rectDown: TRectDown;
	rectMove: TRectMove;
	rectUp: TRectUp;
}

type TRectMove = () => IMethods & Omit<IRect, "rectMove">;
type TRectDown = () => IMethods & Omit<IRect, "rectDown">;
type TRectUp = () => IMethods & Omit<IRect, "rectUp">;

// let points = []; // Массив для хранения точек
let isDraw = false;

export const rectDown: TRectDown = () => {
	const { mouseDown } = Handlers.getMouseHandlers();

	if (mouseDown.flag && mouseDown.e) {
		mouseDown.flag = false;
		isDraw = true;
	}

	return { ...Methods, rectMove, rectUp };
};

export const rectMove: TRectMove = () => {
	const { mouseMove } = Handlers.getMouseHandlers();

	// if (!isDrawEnded && mouseMove.e && (mouseMove.flag || points.length)) {
	// }

	if (mouseMove.flag) {
		updateSettings({ css: { cursor: "crosshair" } });
	}

	if (isDraw && mouseMove.flag) {
		console.log("buhhhhhh");
	}

	return { ...Methods, rectUp, rectDown };
};

export const rectUp = () => {
	const { mouseUp } = Handlers.getMouseHandlers();

	if (mouseUp.flag) {
		isDraw = false;
	}

	return { ...Methods, rectDown, rectMove };
};
