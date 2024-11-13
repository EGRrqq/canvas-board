import { loadGraph, visualizeGraph } from "@/aStarAlgorithm";

const width = 5;
const height = 3;
const obstacles: [number, number][] = [
	[1, 1],
	[2, 1],
]; // Препятствия
const graph = await loadGraph(width, height, obstacles);

const startNode = graph[0][0]; // Стартовая точка
const endNode = graph[2][4]; // Конечная точка

await visualizeGraph(graph, startNode, endNode);
