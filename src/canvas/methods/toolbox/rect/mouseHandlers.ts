import { Draw } from "@/canvas/methods/Draw";
import { Storage } from "@/canvas/methods/storage";
import type {
	IHandlers,
	TMouseHandler,
} from "@/canvas/methods/toolbox/handler";
import type { IDrawingItem, Point } from "@/models";
import { v4 as uuidv4 } from "uuid";

let startPoint: Point | null = null;
let currentRect: IDrawingItem<"rect"> | null = null;
let isDrawing = false;

export const getRectDrawingState = () => isDrawing;

const mouseDown: TMouseHandler = (e) => {
	startPoint = { x: e.offsetX, y: e.offsetY };
	isDrawing = true;

	currentRect = {
		id: uuidv4(),
		tool: {
			type: "rect",
			data: { rect: { position: startPoint, size: { height: 0, width: 0 } } },
			settings: { fillStyle: "blue" },
		},
		boundElem: [],
		activeTool: "rect",
	};

	Storage.saveDrawing(currentRect);
};

const mouseMove: TMouseHandler = (e) => {
	if (!startPoint || !currentRect || !isDrawing) return;

	const width = e.offsetX - startPoint.x;
	const height = e.offsetY - startPoint.y;

	currentRect.tool.data.rect.size = { width, height };
	Draw.rect(currentRect.tool.data);
};

const mouseUp: TMouseHandler = () => {
	if (!currentRect) return;

	Storage.saveDrawing(currentRect);
	isDrawing = false;
	startPoint = null;
	currentRect = null;
};

export const RectHandlers: IHandlers = {
	mouseDown,
	mouseMove,
	mouseUp,
};
