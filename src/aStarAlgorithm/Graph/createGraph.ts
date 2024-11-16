import type { IGraphData } from "@/aStarAlgorithm";
import { createKey } from "@/aStarAlgorithm/Graph/createKey";
import type { TGraph } from "@/models";

export const createGraph = (data: IGraphData): TGraph => {
	const graph: TGraph = new Map();
	const totalNodes = data.width * data.height;

	for (let i = 0; i < totalNodes; i++) {
		const x = i % data.width;
		const y = Math.floor(i / data.width);
		const key = createKey({ x, y });
		graph.set(key, {
			x,
			y,
			traversable: true,
			gCost: 0,
			hCost: 0,
			fCost: 0,
		});
	}

	return graph;
};
