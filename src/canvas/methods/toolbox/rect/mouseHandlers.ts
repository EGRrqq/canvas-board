import { Draw } from "@/canvas/methods/Draw";
import { Storage } from "@/canvas/methods/storage";
import type {
	IHandlers,
	TMouseHandler,
} from "@/canvas/methods/toolbox/handler";
import { View } from "@/canvas/methods/view";
import type { IDrawingItem, Point } from "@/models";
import { v4 as uuidv4 } from "uuid";

let startPoint: Point | null = null;
let currentRect: IDrawingItem<"rect"> | null = null;

const mouseDown: TMouseHandler = (e) => {
	startPoint = { x: e.offsetX, y: e.offsetY };

	currentRect = {
		id: uuidv4(),
		tool: {
			type: "rect",
			data: { rect: { position: startPoint, size: { height: 0, width: 0 } } },
			settings: { fillStyle: "blue" },
		},
		boundElem: [],
	};
};

const mouseMove: TMouseHandler = (e) => {
	if (!startPoint || !currentRect) return;

	const width = e.offsetX - startPoint.x;
	const height = e.offsetY - startPoint.y;

	currentRect.tool.data.rect.size = { width, height };
	Draw.rect(currentRect.tool.data);
};

const mouseUp: TMouseHandler = () => {
	if (!currentRect) return;

	Storage.save(currentRect);
	startPoint = null;
	currentRect = null;
};

export const RectHandlers: IHandlers = {
	mouseDown,
	mouseMove,
	mouseUp,
};
