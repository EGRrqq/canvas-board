import { type IMethods, Methods } from "@/canvas/methods";
import { Draw } from "@/canvas/methods/Draw";
import { updateSettings } from "@/canvas/methods/settings";
import { Storage } from "@/canvas/methods/storage";
import { Handlers } from "@/canvas/methods/toolbox/tool/handlers";
import { isRect, isRectsIntersect } from "@/dataConverter";
import type { IDrawingItem, Point } from "@/models";
import { v4 as uuidv4 } from "uuid";

interface IRect {
	rectDown: TRectDown;
	rectMove: TRectMove;
	rectUp: TRectUp;
}

type TRectMove = () => IMethods & Omit<IRect, "rectMove">;
type TRectDown = () => IMethods & Omit<IRect, "rectDown">;
type TRectUp = () => IMethods & Omit<IRect, "rectUp">;

let startPoint: Point | null = null;
let currentRect: IDrawingItem<"rect"> | null = null;
let isDraw = false;

const getStorageRectData = () =>
	Storage.getDrawings()?.filter(
		(i) => i.tool.type === "rect",
	) as IDrawingItem<"rect">[];
const getRectDrawings = () => {
	const d = getStorageRectData();
	return d ? d : [];
};

export const rectDown: TRectDown = () => {
	const { mouseDown } = Handlers.getMouseHandlers();

	if (mouseDown.flag && mouseDown.e) {
		mouseDown.flag = false;
		isDraw = true;

		startPoint = { x: mouseDown.e.offsetX, y: mouseDown.e.offsetY };

		currentRect = {
			id: uuidv4(),
			tool: {
				type: "rect",
				data: { rect: { position: startPoint, size: { height: 0, width: 0 } } },
				settings: { fillStyle: "blue" },
			},
		};
	}

	return { ...Methods, rectMove, rectUp };
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
		Draw.rect(currentRect.tool.data);
	}

	return { ...Methods, rectUp, rectDown };
};

export const rectUp = () => {
	const { mouseUp } = Handlers.getMouseHandlers();

	if (mouseUp.flag && currentRect) {
		isDraw = false;

		const { rect: newRect } = currentRect.tool.data;
		const intersects = getRectDrawings().some((rect) =>
			isRectsIntersect(rect.tool.data.rect, newRect),
		);

		if (isRect(newRect) && !intersects) {
			Storage.saveDrawing(currentRect);
		}

		startPoint = null;
		currentRect = null;
	}

	return { ...Methods, rectDown, rectMove };
};
