import type { Point } from "@/models";
import type { TGraph } from "../models";

export const setObstacles = (
	graph: TGraph,
	obstacles: Point[],
	start: Point,
	end: Point,
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
		if (start.x === x && start.y === y) {
			throw new Error(
				`Стартовая точка (${start.x}, ${start.y}) находится на препятствии`,
			);
		}
		if (end.x === x && end.y === y) {
			throw new Error(
				`Конечная точка (${end.x}, ${end.y}) находится на препятствии`,
			);
		}
	}
};
