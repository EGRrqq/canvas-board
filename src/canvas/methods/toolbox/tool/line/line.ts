import { type IMethods, Methods } from "@/canvas/methods";
import { Handlers } from "@/canvas/methods/toolbox/tool/handlers";

interface ILine {
	lineDown: TLineDown;
	lineMove: TLineMove;
	lineUp: TLineUp;
	lineValidate: TLineValidate;
}

type TLineMove = () => IMethods & Omit<ILine, "lineMove">;
type TLineDown = () => IMethods & Omit<ILine, "lineDown">;
type TLineUp = () => IMethods & Omit<ILine, "lineUp">;
type TLineValidate = () => IMethods & Omit<ILine, "lineValidate">;

let isDraw = false;

export const lineDown: TLineDown = () => {
	const { mouseDown } = Handlers.getMouseHandlers();

	if (mouseDown.flag && mouseDown.e) {
		mouseDown.flag = false;
		isDraw = true;
	}
	return { ...Methods, lineUp, lineMove, lineValidate };
};

export const lineMove: TLineMove = () => {
	if (isDraw) {
		console.log("we movin");
	}
	// if (isPointOnRectBoundary()) {
	// }

	return { ...Methods, lineDown, lineUp, lineValidate };
};

export const lineUp: TLineUp = () => {
	const { mouseUp } = Handlers.getMouseHandlers();

	if (mouseUp.flag) {
		isDraw = false;
	}

	return { ...Methods, lineDown, lineMove, lineValidate };
};

export const lineValidate = () => {
	return { ...Methods, lineDown, lineMove, lineUp };
};
