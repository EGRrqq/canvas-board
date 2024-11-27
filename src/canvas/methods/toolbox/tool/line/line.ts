import { type IMethods, Methods } from "@/canvas/methods";
import { Draw } from "@/canvas/methods/Draw";
import { updateSettings } from "@/canvas/methods/settings";
import { Handlers } from "@/canvas/methods/toolbox/tool/handlers";
import { getRectDrawings } from "@/canvas/methods/toolbox/utils/getRectDrawings";
import { isPointOnRectBoundary } from "@/dataConverter";
import { getValidConnectionPoints } from "@/dataConverter/validate";
import type { Point } from "@/models";

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

const boundary = (point: Point) =>
	getRectDrawings().some((rect) =>
		isPointOnRectBoundary(point, rect.tool.data.rect),
	);

export const lineDown: TLineDown = () => {
	const { mouseDown } = Handlers.getMouseHandlers();

	if (mouseDown.flag && mouseDown.e) {
		mouseDown.flag = false;
		if (!notAllowed) isDraw = true;
	}
	return { ...Methods, lineUp, lineMove, lineValidate };
};

export const lineMove: TLineMove = () => {
	const { mouseMove } = Handlers.getMouseHandlers();

	if (mouseMove.flag) {
		updateSettings({ css: { cursor: "crosshair" } });
	}

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
		let nearestPoint: Point | null = null;
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
					}
				}
			}
		}

		if (nearestPoint) {
			updateSettings({ css: { cursor: "pointer" } });
			Draw.rect(
				{
					rect: { position: nearestPoint, size: { height: 7, width: 7 } },
				},
				{ fillStyle: "black" },
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
