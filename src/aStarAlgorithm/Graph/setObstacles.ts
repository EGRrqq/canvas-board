import type { TGraph } from "@/aStarAlgorithm";
import type { Point } from "@/models";
import { validatePoint } from "./validatePoint";

export const setObstacles = (
	graph: TGraph,
	obstacles: Point[],
	startNode: Point,
	endNode: Point,
): void => {
	for (const { x, y } of obstacles) {
		// Проверка на выход за границы графа
		if (!graph[y]?.[x]) {
			validatePoint(graph, { x, y }, "Препятствие");
		}

		// Устанавливаем препятствие, если это не стартовая или конечная точка
		if (
			!(startNode.x === x && startNode.y === y) &&
			!(endNode.x === x && endNode.y === y)
		) {
			graph[y][x].traversable = false;
		}
	}
};
