import { getRectDimensions } from "@/dataConverter/rect";
import { describe, expect, it } from "vitest";

describe("getRectDimensions", () => {
	it("должен корректно вычислять размеры графа для двух прямоугольников", () => {
		const rect1 = {
			position: { x: 0, y: 0 },
			size: { width: 10, height: 10 },
		};
		const rect2 = {
			position: { x: 20, y: 20 },
			size: { width: 10, height: 10 },
		};

		const result = getRectDimensions(rect1, rect2);
		expect(result).toEqual({ width: 50, height: 50 });
	});

	it("должен корректно вычислять размеры графа для прямоугольников с разными размерами", () => {
		const rect1 = {
			position: { x: 0, y: 0 },
			size: { width: 20, height: 10 },
		};
		const rect2 = {
			position: { x: 10, y: 10 },
			size: { width: 10, height: 20 },
		};

		const result = getRectDimensions(rect1, rect2);
		expect(result).toEqual({ width: 30, height: 40 });
	});

	it("должен корректно вычислять размеры графа для прямоугольников с отрицательными координатами", () => {
		const rect1 = {
			position: { x: -10, y: -10 },
			size: { width: 20, height: 20 },
		};
		const rect2 = {
			position: { x: 10, y: 10 },
			size: { width: 20, height: 20 },
		};

		const result = getRectDimensions(rect1, rect2);
		expect(result).toEqual({ width: 40, height: 40 });
	});
});
