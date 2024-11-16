import type { Point, TGraphNode } from "@/models";

// Функция для восстановления пути
export const reconstructPath = (endNode: TGraphNode): Point[] => {
	const path: Point[] = [];
	let currentNode: TGraphNode | undefined = endNode;

	while (currentNode) {
		path.push({ x: currentNode.x, y: currentNode.y });
		currentNode = currentNode.parent; // Переход к родительскому узлу
	}

	return path.reverse(); // Возвращаем путь в правильном порядке
};
