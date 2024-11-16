import { isRectsIntersect } from "@/dataConverter/validate";
import { describe, expect, it } from "vitest";

describe("getRectDimensions", () => {
	it("должен возвращать true, если прямоугольники пересекаются", () => {
		const rect1 = {
			position: { x: 0, y: 0 },
			size: { width: 20, height: 10 },
		};
		const rect2 = {
			position: { x: 10, y: 10 },
			size: { width: 10, height: 20 },
		};

		const result = isRectsIntersect(rect1, rect2);
		expect(result).toBe(true);
	});

	it("должен возвращать false, если прямоугольники пересекаются", () => {
		const rect1 = {
			position: { x: 0, y: 0 },
			size: { width: 20, height: 10 },
		};
		const rect2 = {
			position: { x: 30, y: 10 },
			size: { width: 10, height: 20 },
		};

		const result = isRectsIntersect(rect1, rect2);
		expect(result).toBe(false);
	});
});
