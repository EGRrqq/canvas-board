import type { TGraph } from "@/aStarAlgorithm";
import type { Point } from "@/models";

export const validatePoint = (
	graph: TGraph,
	point: Point,
	pointName: string,
): void => {
	if (!graph[point.y] || !graph[point.y][point.x]) {
		throw new Error(`${pointName} (${point.x}, ${point.y}) вне границ графа`);
	}
};
