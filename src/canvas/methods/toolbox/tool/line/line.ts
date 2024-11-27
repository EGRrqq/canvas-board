import { type IMethods, Methods } from "@/canvas/methods";
import { Draw, type IDrawRectSettings } from "@/canvas/methods/Draw";
import { updateSettings } from "@/canvas/methods/settings";
import { Storage } from "@/canvas/methods/storage";
import { Handlers } from "@/canvas/methods/toolbox/tool/handlers";
import { getRectDrawings } from "@/canvas/methods/toolbox/utils/getRectDrawings";
import { dataConverter, isPointOnRectBoundary } from "@/dataConverter";
import {
	getValidAngles,
	getValidConnectionPoints,
} from "@/dataConverter/validate";
import type { IDrawingItem, Point, Rect } from "@/models";
import { v4 as uuidv4 } from "uuid";

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
let notAllowed = false;
let nearestPoint: Point | null = null;
let rect1: Rect | null = null;
let rect2: Rect | null = null;
let firstPointFlag = true;
const rectSize: Rect["size"] = { height: 7, width: 7 };
const rectSettings: IDrawRectSettings = { fillStyle: "black" };

let firstPoint: IDrawingItem<"point"> = {
	id: uuidv4(),
	tool: {
		type: "point",
		data: { rect: { position: { x: 0, y: 0 }, size: rectSize } },
		settings: rectSettings,
	},
};
let secondPoint: IDrawingItem<"point"> = {
	id: uuidv4(),
	tool: {
		type: "point",
		data: { rect: { position: { x: 0, y: 0 }, size: rectSize } },
		settings: rectSettings,
	},
};

const boundary = (point: Point) =>
	getRectDrawings().some((rect) =>
		isPointOnRectBoundary(point, rect.tool.data.rect),
	);

export const lineDown: TLineDown = async () => {
	const { mouseDown } = Handlers.getMouseHandlers();

	if (mouseDown.flag && mouseDown.e) {
		mouseDown.flag = false;
		if (!notAllowed) isDraw = true;

		if (!notAllowed && nearestPoint && firstPointFlag) {
			console.log("click");

			firstPoint.tool.data.rect.position = nearestPoint;
			firstPointFlag = false;
			Storage.saveDrawing(firstPoint);
		}

		if (!notAllowed && nearestPoint && !firstPointFlag) {
			secondPoint.tool.data.rect.position = nearestPoint;
			firstPointFlag = false;
			Storage.saveDrawing(secondPoint);
		}

		console.log({ rect1, rect2 });
		if (rect1 && rect2) {
			const point1 = firstPoint.tool.data.rect.position;
			const point2 = secondPoint.tool.data.rect.position;
			const firstValidAngle = getValidAngles(point1, rect1)[0];
			const secondValidAngle = getValidAngles(point2, rect2)[0];

			const data = await dataConverter({
				cPoint1: {
					point: point1,
					angle: firstValidAngle,
				},
				cPoint2: { point: point2, angle: secondValidAngle },
				rect1,
				rect2,
			});

			Draw.line({ path: data }, { lineWidth: 1.5 });
			Storage.saveDrawing({
				id: "",
				tool: {
					type: "line",
					data: { path: data },
					settings: { lineWidth: 1.5 },
				},
			});

			firstPoint = {
				id: uuidv4(),
				tool: {
					type: "point",
					data: { rect: { position: { x: 0, y: 0 }, size: rectSize } },
					settings: rectSettings,
				},
			};
			secondPoint = {
				id: uuidv4(),
				tool: {
					type: "point",
					data: { rect: { position: { x: 0, y: 0 }, size: rectSize } },
					settings: rectSettings,
				},
			};
			rect1 = null;
			rect2 = null;

			firstPointFlag = true;
		}
	}
	return { ...Methods, lineUp, lineMove, lineValidate };
};

export const lineMove: TLineMove = () => {
	const { mouseMove } = Handlers.getMouseHandlers();
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
	const { mouseMove } = Handlers.getMouseHandlers();
	if (!isDraw && mouseMove.e) {
		const RADIUS = 10;
		const cursorPoint = { x: mouseMove.e.offsetX, y: mouseMove.e.offsetY };
		let minDistance = Number.POSITIVE_INFINITY;

		for (const rect of getRectDrawings()) {
			const validPoints = getValidConnectionPoints(rect.tool.data.rect);
			for (const point of validPoints) {
				const distance = Math.sqrt(
					(cursorPoint.x - point.x) ** 2 + (cursorPoint.y - point.y) ** 2,
				);
				if (distance <= RADIUS) {
					if (distance < minDistance) {
						minDistance = distance;
						nearestPoint = point;

						if (firstPointFlag) {
							rect1 = rect.tool.data.rect;
						} else {
							rect2 = rect.tool.data.rect;
						}
					}
				}
			}
		}

		if (nearestPoint) {
			notAllowed = false;
			updateSettings({ css: { cursor: "pointer" } });
			Draw.rect(
				{
					rect: {
						position: nearestPoint,
						size: firstPoint.tool.data.rect.size,
					},
				},
				firstPoint.tool.settings,
			);
		} else if (!boundary(cursorPoint)) {
			isDraw = false;
			notAllowed = true;
			updateSettings({ css: { cursor: "not-allowed" } });
			return { ...Methods, lineDown, lineMove, lineUp };
		}
	}

	return { ...Methods, lineDown, lineMove, lineUp };
};
