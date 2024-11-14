import { calcPath } from '@/aStarAlgorithm/Graph';
import { describe, expect, it } from 'vitest';

describe('calcPath', () => {
	it('должен рассчитать путь от стартовой точки до конечной', async () => {
		const data = {
			start: { x: 0, y: 0 },
			end: { x: 1, y: 1 },
			obstacles: [],
			width: 2,
			height: 2,
		};

		const path = await calcPath(data);

		expect(path).toEqual([
			{ x: 0, y: 0 },
			{ x: 1, y: 0 },
			{ x: 1, y: 1 },
		]);
	});
});
