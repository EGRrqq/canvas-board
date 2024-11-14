import { findPath } from '@/aStarAlgorithm/Graph/findPath';
import { describe, expect, it } from 'vitest';

describe('findPath', () => {
	it('должен найти путь от стартовой точки до конечной', async () => {
		const graph = [
			[
				{ x: 0, y: 0, traversable: true, gCost: 0, hCost: 0, fCost: 0 },
				{ x: 1, y: 0, traversable: true, gCost: 0, hCost: 0, fCost: 0 },
			],
			[
				{ x: 0, y: 1, traversable: true, gCost: 0, hCost: 0, fCost: 0 },
				{ x: 1, y: 1, traversable: true, gCost: 0, hCost: 0, fCost: 0 },
			],
		];
		const startNode = graph[0][0];
		const endNode = graph[1][1];

		const path = await findPath(graph, startNode, endNode);

		expect(path).toEqual([
			{ x: 0, y: 0 },
			{ x: 1, y: 0 },
			{ x: 1, y: 1 },
		]);
	});

	it('должен выбросить ошибку, если путь не найден', async () => {
		const graph = [
			[
				{ x: 0, y: 0, traversable: true, gCost: 0, hCost: 0, fCost: 0 },
				{ x: 1, y: 0, traversable: false, gCost: 0, hCost: 0, fCost: 0 },
			],
			[
				{ x: 0, y: 1, traversable: false, gCost: 0, hCost: 0, fCost: 0 },
				{ x: 1, y: 1, traversable: true, gCost: 0, hCost: 0, fCost: 0 },
			],
		];
		const startNode = graph[0][0];
		const endNode = graph[1][1];

		await expect(findPath(graph, startNode, endNode)).rejects.toThrow('Путь не найден');
	});
});
