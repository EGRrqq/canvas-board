import type { Point } from "@/models";
import type { TGraph } from "../models";

export const checkPoint = (
	graph: TGraph,
	point: Point,
	pointName: string,
): void => {
	if (!graph[point.y] || !graph[point.y][point.x]) {
		throw new Error(`${pointName} (${point.x}, ${point.y}) нет в графе`);
	}
};
