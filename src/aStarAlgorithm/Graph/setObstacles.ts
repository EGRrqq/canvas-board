import { validatePoint } from "@/aStarAlgorithm/validate";
import type { Point, TGraph } from "@/models";

export const setObstacles = (
	graph: TGraph,
	obstacles: Point[],
	startNode: Point,
	endNode: Point,
): void => {
	for (const { x, y } of obstacles) {
		const node = validatePoint(graph, { x, y }, "Препятствие");

		// Устанавливаем препятствие, если это не стартовая или конечная точка
		if (
			!(startNode.x === x && startNode.y === y) &&
			!(endNode.x === x && endNode.y === y)
		) {
			node.traversable = false;
		}
	}
};
