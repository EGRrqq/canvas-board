import { Graph, type IGraphData, type IGraphSettings } from "@/aStarAlgorithm";

const graphData: IGraphData = {
	width: 5,
	height: 7,
	obstacles: [
		{ x: 1, y: 1 },
		{ x: 2, y: 1 },
	],
	start: { x: 1, y: 3 },
	end: { x: 4, y: 5 },
};
const graphSettings: IGraphSettings = { log: true };

const path = await Graph.calcPath(graphData, graphSettings);
console.log(path);
