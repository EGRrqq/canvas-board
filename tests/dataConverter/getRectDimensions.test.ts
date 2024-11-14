import { Graph } from "@/aStarAlgorithm";
import { dataConverter } from "@/dataConverter";
import { describe, expect, it, vi } from "vitest";

describe("dataConverter", () => {
	it("должен корректно вычислять путь между двумя прямоугольниками", async () => {
		const rect1 = {
			position: { x: 0, y: 0 },
			size: { width: 10, height: 10 },
		};
		const rect2 = {
			position: { x: 20, y: 20 },
			size: { width: 10, height: 10 },
		};
		const cPoint1 = { point: { x: 5, y: 0 }, angle: 90 };
		const cPoint2 = { point: { x: 25, y: 20 }, angle: 90 };

		const mockPath = [
			{ x: 5, y: 0 },
			{ x: 10, y: 10 },
			{ x: 25, y: 20 },
		];
		vi.spyOn(Graph, "calcPath").mockResolvedValue(mockPath);

		const result = await dataConverter(rect1, rect2, cPoint1, cPoint2);
		expect(result).toEqual(mockPath);
	});
});
