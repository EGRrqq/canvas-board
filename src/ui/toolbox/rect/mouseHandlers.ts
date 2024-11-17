import type { TCanvas } from "@/canvas";
import type { IDrawingItem, Point } from "@/models";
import type { TMouseHandlerClosure, TSetHandlers } from "@/ui/toolbox/handler";
import { v4 as uuidv4 } from "uuid";

let startPoint: Point | null = null;
let currentRect: IDrawingItem<"rect"> | null = null;

const mouseDownClosure: TMouseHandlerClosure = () => (e) => {
	startPoint = { x: e.offsetX, y: e.offsetY };
	currentRect = {
		id: uuidv4(),
		tool: { type: "rect", settings: { fillStyle: "blue" } },
		position: startPoint,
		size: { width: 0, height: 0 },
		boundElem: [],
	};
};

const mouseMoveClosure: TMouseHandlerClosure =
	(Board: ReturnType<TCanvas>) => (e) => {
		if (!startPoint || !currentRect) return;

		const width = e.offsetX - startPoint.x;
		const height = e.offsetY - startPoint.y;

		currentRect.size = { width, height };
		Board.clear().drawRect({
			position: currentRect.position,
			size: currentRect.size,
		});
	};

const mouseUpClosure: TMouseHandlerClosure = () => () => {
	if (!currentRect) return;

	startPoint = null;
	currentRect = null;
};

export const RectClosures: ReturnType<TSetHandlers> = {
	mouseDownClosure,
	mouseMoveClosure,
	mouseUpClosure,
};
