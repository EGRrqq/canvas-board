import { createKey } from "@/aStarAlgorithm/Graph/createKey";
import type { Point, TGraphNode } from "@/models";

export const validatePoint = (
	graph: Map<string, TGraphNode>,
	point: Point,
	pointName: string,
): TGraphNode => {
	const key = createKey(point);

	const node = graph.get(key);

	if (!graph.has(key) || !node) {
		throw new Error(`${pointName} (${point.x}, ${point.y}) нет в графе`);
	}

	return node;
};
