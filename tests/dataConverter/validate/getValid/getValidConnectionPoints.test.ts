import { getValidConnectionPoints } from "@/dataConverter/validate";
import { describe, expect, it } from "vitest";

describe("getValidConnectionPoints", () => {
	it("должен возвращать все допустимые точки подключения для прямоугольника", () => {
		const rect = {
			position: { x: 5, y: 5 },
			size: { width: 4, height: 4 },
		};

		const result = getValidConnectionPoints(rect);

		const expectedPoints = [
			{ x: 3, y: 3 },
			{ x: 3, y: 7 },
			{ x: 4, y: 3 },
			{ x: 4, y: 7 },
			{ x: 5, y: 3 },
			{ x: 5, y: 7 },
			{ x: 6, y: 3 },
			{ x: 6, y: 7 },
			{ x: 7, y: 3 },
			{ x: 7, y: 7 },
			{ x: 3, y: 3 },
			{ x: 7, y: 3 },
			{ x: 3, y: 4 },
			{ x: 7, y: 4 },
			{ x: 3, y: 5 },
			{ x: 7, y: 5 },
			{ x: 3, y: 6 },
			{ x: 7, y: 6 },
			{ x: 3, y: 7 },
			{ x: 7, y: 7 },
		];

		expect(result).toEqual(expectedPoints);
	});
});
