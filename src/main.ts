import { Graph, type IGraphData, type IGraphSettings } from "@/aStarAlgorithm";

const graphData: IGraphData = {
	width: 5,
	height: 3,
	obstacles: [
		{ x: 1, y: 1 },
		{ x: 2, y: 1 },
	],
	start: { x: 1, y: 0 },
	end: { x: 2, y: 2 },
};
const graphSettings: IGraphSettings = { log: true };

const graph = await Graph.init(graphData, graphSettings);
