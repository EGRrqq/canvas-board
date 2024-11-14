import { getRectObstacles } from "@/dataConverter/getRectObstacles";
import { describe, expect, it } from "vitest";

describe("getRectObstacles", () => {
	it("должен корректно генерировать препятствия для прямоугольника", () => {
		const rect = {
			position: { x: 0, y: 0 },
			size: { width: 2, height: 2 },
		};

		const result = getRectObstacles(rect);
		expect(result).toEqual([
			{ x: -1, y: -1 },
			{ x: -1, y: 0 },
			{ x: -1, y: 1 },
			{ x: 0, y: -1 },
			{ x: 0, y: 0 },
			{ x: 0, y: 1 },
			{ x: 1, y: -1 },
			{ x: 1, y: 0 },
			{ x: 1, y: 1 },
		]);
	});

	it("должен корректно генерировать препятствия для прямоугольника с другими размерами", () => {
		const rect = {
			position: { x: 2, y: 2 },
			size: { width: 2, height: 2 },
		};

		const result = getRectObstacles(rect);
		expect(result).toEqual([
			{ x: 1, y: 1 },
			{ x: 1, y: 2 },
			{ x: 1, y: 3 },
			{ x: 2, y: 1 },
			{ x: 2, y: 2 },
			{ x: 2, y: 3 },
			{ x: 3, y: 1 },
			{ x: 3, y: 2 },
			{ x: 3, y: 3 },
		]);
	});
});
