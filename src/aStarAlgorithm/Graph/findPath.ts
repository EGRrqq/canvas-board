import type { TGraph, TGraphNode } from "@/aStarAlgorithm/models";
import type { Point } from "@/models";

export const findPath = async (
	graph: TGraph,
	startNode: TGraphNode,
	endNode: TGraphNode,
): Promise<Point[]> => {
	// Инициализация буферов
	const openNodes: TGraphNode[] = [startNode];
	const closedNodes: TGraphNode[] = [];

	while (openNodes.length > 0) {
		// 1. Найти узел с наименьшим fCost
		let currentNode = openNodes[0];
		let currentIndex = 0;
		for (let i = 1; i < openNodes.length; i++) {
			if (openNodes[i].fCost < currentNode.fCost) {
				currentNode = openNodes[i];
				currentIndex = i;
			}
		}

		// 2. Переместить текущий узел в closedNodes
		openNodes.splice(currentIndex, 1);
		closedNodes.push(currentNode);

		// 3. Проверка на конечный узел
		if (currentNode === endNode) {
			return reconstructPath(currentNode); // Восстановление пути
		}

		// 4. Проверка соседних узлов
		const neighbors = getNeighbors(graph, currentNode);
		for (const neighbor of neighbors) {
			if (!neighbor.traversable || closedNodes.includes(neighbor)) {
				continue; // Игнорируем непроходимые или уже проверенные узлы
			}

			// 5. Обновление родителя и добавление в openNodes
			const tentativeGCost = currentNode.gCost + 1; // Предполагаемая стоимость (можно изменить в зависимости от расстояния)
			if (!openNodes.includes(neighbor) || tentativeGCost < neighbor.gCost) {
				neighbor.parent = currentNode; // Устанавливаем текущий узел как родитель
				neighbor.gCost = tentativeGCost; // Обновляем gCost
				neighbor.hCost =
					Math.abs(neighbor.x - endNode.x) + Math.abs(neighbor.y - endNode.y); // Обновляем hCost
				neighbor.fCost = neighbor.gCost + neighbor.hCost; // Обновляем fCost

				if (!openNodes.includes(neighbor)) {
					openNodes.push(neighbor);
				}
			}
		}
	}

	// Если мы вышли из цикла, значит путь не найден
	throw new Error("Путь не найден");
};

// Функция для восстановления пути
const reconstructPath = (endNode: TGraphNode): Point[] => {
	const path: Point[] = [];
	let currentNode: TGraphNode | undefined = endNode;

	while (currentNode) {
		path.push({ x: currentNode.x, y: currentNode.y });
		currentNode = currentNode.parent; // Переход к родительскому узлу
	}

	return path.reverse(); // Возвращаем путь в правильном порядке
};

// Функция для получения соседей узла
const getNeighbors = (graph: TGraph, node: TGraphNode): TGraphNode[] => {
	const neighbors: TGraphNode[] = [];
	const directions = [
		{ x: 0, y: -1 }, // Вверх
		{ x: 1, y: 0 }, // Вправо
		{ x: 0, y: 1 }, // Вниз
		{ x: -1, y: 0 }, // Влево
	];

	for (const { x, y } of directions) {
		const neighborX = node.x + x;
		const neighborY = node.y + y;

		if (graph[neighborY]?.[neighborX]) {
			neighbors.push(graph[neighborY][neighborX]);
		}
	}

	return neighbors;
};
