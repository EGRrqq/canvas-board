import type { Point } from "@/models";
import type { TGraph } from "../models";

export const setObstacles = (
	graph: TGraph,
	obstacles: Point[],
	startNode: Point,
	endNode: Point,
): void => {
	for (const { x, y } of obstacles) {
		// Проверка на выход за границы графа
		if (!graph[y]?.[x]) {
			console.warn(`Препятствие (${x}, ${y}) вне границ графа`);
			continue; // Пропускаем итерацию, если препятствие вне границ
		}

		// Устанавливаем препятствие
		graph[y][x].traversable = false;

		// Проверка, попадает ли стартовая или конечная точка в препятствия
		if (startNode.x === x && startNode.y === y) {
			throw new Error(
				`Стартовая точка (${startNode.x}, ${startNode.y}) находится на препятствии`,
			);
		}
		if (endNode.x === x && endNode.y === y) {
			throw new Error(
				`Конечная точка (${endNode.x}, ${endNode.y}) находится на препятствии`,
			);
		}
	}
};
