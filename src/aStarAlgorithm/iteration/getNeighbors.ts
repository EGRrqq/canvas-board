import { createKey } from "@/aStarAlgorithm/utils";
import type { TGraphNode } from "@/models";

// Функция для получения соседей узла
export const getNeighbors = (
	graph: Map<string, TGraphNode>,
	node: TGraphNode,
): TGraphNode[] => {
	const neighbors: TGraphNode[] = [];
	const directions = [
		{ x: 0, y: -1 }, // Вверх
		{ x: 1, y: 0 }, // Вправо
		{ x: 0, y: 1 }, // Вниз
		{ x: -1, y: 0 }, // Влево
	];

	for (const { x, y } of directions) {
		const neighborKey = createKey({ x: node.x + x, y: node.y + y });
		const neighbor = graph.get(neighborKey);
		if (neighbor) {
			neighbors.push(neighbor);
		}
	}

	return neighbors;
};
