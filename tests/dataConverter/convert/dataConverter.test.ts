import { Graph } from "@/aStarAlgorithm";
import { dataConverter } from "@/dataConverter";
import { describe, expect, it, vi } from "vitest";

describe("dataConverter", () => {
	it("должен корректно вычислять путь между двумя прямоугольниками", async () => {
		const rect1 = { position: { x: 2, y: 3 }, size: { width: 2, height: 2 } };
		const rect2 = { position: { x: 6, y: 5 }, size: { width: 2, height: 2 } };
		const cPoint1 = { point: { x: 3, y: 2 }, angle: 90 };
		const cPoint2 = { point: { x: 5, y: 4 }, angle: 90 };

		const mockPath = [
			{ x: 3, y: 2 },
			{ x: 4, y: 2 },
			{ x: 5, y: 2 },
			{ x: 5, y: 3 },
			{ x: 5, y: 4 },
		];
		vi.spyOn(Graph, "calcPath").mockResolvedValue(mockPath);

		const result = await dataConverter({ rect1, rect2, cPoint1, cPoint2 });
		expect(result).toEqual(mockPath);
	});
});
