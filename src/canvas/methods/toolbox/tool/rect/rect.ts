import { type IMethods, Methods } from "@/canvas/methods";
import { Draw, type IDrawRectSettings } from "@/canvas/methods/Draw";
import { updateSettings } from "@/canvas/methods/settings";
import { Storage } from "@/canvas/methods/storage";
import { Handlers } from "@/canvas/methods/toolbox/tool/handlers";
import { getRectDrawings } from "@/canvas/methods/toolbox/utils/getRectDrawings";
import { isRect, isRectsIntersect } from "@/dataConverter";
import type { IDrawingItem, Point, Rect } from "@/models";
import { v4 as uuidv4 } from "uuid";

interface IRect {
	rectDown: TRectDown;
	rectMove: TRectMove;
	rectUp: TRectUp;
	rectValidate: TRectValidate;
}

type TRectMove = () => IMethods & Omit<IRect, "rectMove">;
type TRectDown = () => IMethods & Omit<IRect, "rectDown">;
type TRectUp = () => IMethods & Omit<IRect, "rectUp">;
type TRectValidate = () => IMethods & Omit<IRect, "rectValidate">;

const rectSettings: IDrawRectSettings = {
	fillStyle: "#ffdff1",
	style: "fillAndStroke",
	strokeStyle: "black",
};

let startPoint: Point | null = null;
let currentRect: IDrawingItem<"rect"> | null = null;
let isDraw = false;
let notAllowed = false;

const intersects = (newRect: Rect) =>
	getRectDrawings().some((rect) =>
		isRectsIntersect(rect.tool.data.rect, newRect),
	);

export const rectDown: TRectDown = () => {
	const { mouseDown } = Handlers.getMouseHandlers();

	if (mouseDown.flag && mouseDown.e) {
		mouseDown.flag = false;
		if (!notAllowed) isDraw = true;

		startPoint = { x: mouseDown.e.offsetX, y: mouseDown.e.offsetY };

		currentRect = {
			id: uuidv4(),
			tool: {
				type: "rect",
				data: { rect: { position: startPoint, size: { height: 0, width: 0 } } },
				settings: rectSettings,
			},
		};
	}

	return { ...Methods, rectMove, rectUp, rectValidate };
};

export const rectMove: TRectMove = () => {
	const { mouseMove } = Handlers.getMouseHandlers();

	if (mouseMove.flag) {
		updateSettings({ css: { cursor: "crosshair" } });
	}

	if (isDraw && startPoint && currentRect && mouseMove.flag && mouseMove.e) {
		const width = Math.abs(mouseMove.e.offsetX - startPoint.x);
		const height = Math.abs(mouseMove.e.offsetY - startPoint.y);

		currentRect.tool.data.rect.size = { width, height };
		Draw.rect(currentRect.tool.data, rectSettings);
	}

	return { ...Methods, rectUp, rectDown, rectValidate };
};

export const rectUp: TRectUp = () => {
	const { mouseUp } = Handlers.getMouseHandlers();

	if (mouseUp.flag && currentRect) {
		isDraw = false;

		const { rect: newRect } = currentRect.tool.data;

		if (isRect(newRect) && !notAllowed) {
			Storage.saveDrawing(currentRect);
		}

		startPoint = null;
		currentRect = null;
	}

	return { ...Methods, rectDown, rectMove, rectValidate };
};

export const rectValidate: TRectValidate = () => {
	const { mouseMove } = Handlers.getMouseHandlers();
	if (!isDraw && mouseMove.e) {
		if (
			intersects({
				size: { height: 0, width: 0 },
				position: { x: mouseMove.e.offsetX, y: mouseMove.e.offsetY },
			})
		) {
			isDraw = false;
			notAllowed = true;
			updateSettings({ css: { cursor: "not-allowed" } });
			return { ...Methods, rectDown, rectMove, rectUp };
		}
	}

	if (isDraw && mouseMove.e && currentRect) {
		if (intersects(currentRect.tool.data.rect)) {
			notAllowed = true;
			updateSettings({ css: { cursor: "not-allowed" } });
			return { ...Methods, rectDown, rectMove, rectUp };
		}
	}

	notAllowed = false;

	return { ...Methods, rectDown, rectMove, rectUp };
};
