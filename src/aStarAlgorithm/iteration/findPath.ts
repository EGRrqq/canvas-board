import { getNeighbors } from "@/aStarAlgorithm/iteration/getNeighbors";
import { reconstructPath } from "@/aStarAlgorithm/iteration/reconstructPath";
import type { Point, TGraphNode } from "@/models";

export const findPath = async (
	graph: Map<string, TGraphNode>,
	startNode: TGraphNode,
	endNode: TGraphNode,
): Promise<Point[]> => {
	// Инициализация буферов
	const openNodes = new Set<TGraphNode>([startNode]);
	const closedNodes = new Set<TGraphNode>();

	while (openNodes.size > 0) {
		// 1. Найти узел с наименьшим fCost
		const currentNode = Array.from(openNodes).reduce((minNode, node) =>
			node.fCost < minNode.fCost ? node : minNode,
		);

		// 2. Переместить текущий узел в closedNodes
		openNodes.delete(currentNode);
		closedNodes.add(currentNode);

		// 3. Проверка на конечный узел
		if (currentNode === endNode) {
			return reconstructPath(currentNode); // Восстановление пути
		}

		// 4. Проверка соседних узлов
		const neighbors = getNeighbors(graph, currentNode);
		for (const neighbor of neighbors) {
			if (!neighbor.traversable || closedNodes.has(neighbor)) {
				continue; // Игнорируем непроходимые или уже проверенные узлы
			}

			// 5. Обновление родителя и добавление в openNodes
			const tentativeGCost = currentNode.gCost + 1; // Предполагаемая стоимость (можно изменить в зависимости от расстояния)
			if (!openNodes.has(neighbor) || tentativeGCost < neighbor.gCost) {
				neighbor.parent = currentNode; // Устанавливаем текущий узел как родитель
				neighbor.gCost = tentativeGCost; // Обновляем gCost
				neighbor.hCost =
					Math.abs(neighbor.x - endNode.x) + Math.abs(neighbor.y - endNode.y); // Обновляем hCost
				neighbor.fCost = neighbor.gCost + neighbor.hCost; // Обновляем fCost

				if (!openNodes.has(neighbor)) {
					openNodes.add(neighbor);
				}
			}
		}
	}

	// Если мы вышли из цикла, значит путь не найден
	throw new Error("Путь не найден");
};
