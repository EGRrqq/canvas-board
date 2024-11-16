import type { TGraph } from "@/aStarAlgorithm";
import type { Point } from "@/models";

export const validatePoint = (
	graph: TGraph,
	point: Point,
	pointName: string,
): void => {
	const graphHeight = graph.length;
	const graphWidth = graphHeight > 0 ? graph[0].length : 0;

	if (!graph[point.y] || !graph[point.y][point.x]) {
		throw new Error(
			`${pointName} (${point.x}, ${point.y}) нет в графе размером ${graphWidth}x${graphHeight}\nВажно помнить, про index(точки) - 1`,
		);
	}
};
