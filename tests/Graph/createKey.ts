import { createKey } from "@/aStarAlgorithm/Graph/createKey";
import type { Point } from "@/models";
import { describe, expect, it } from "vitest";

describe("createKey", () => {
	it("должен создать ключ из точки", () => {
		const point: Point = { x: 1, y: 2 };
		const key = createKey(point);

		expect(key).toBe("1,2");
	});

	it("должен создать ключ из другой точки", () => {
		const point: Point = { x: 3, y: 4 };
		const key = createKey(point);

		expect(key).toBe("3,4");
	});
});
