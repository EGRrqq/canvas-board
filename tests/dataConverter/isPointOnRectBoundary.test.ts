import { isPointOnRectBoundary } from "@/dataConverter/isPointOnRectBoundary";
import { describe, expect, it } from "vitest";

const rect = {
	position: { x: 0, y: 0 },
	size: { width: 10, height: 10 },
};

describe("isPointOnRectBoundary", () => {
	it("должен возвращать true, если точка лежит на вертикальной грани", () => {
		const point = { x: -5, y: 0 };

		const result = isPointOnRectBoundary(point, rect);
		expect(result).toBe(true);
	});

	it("должен возвращать true, если точка лежит на горизонтальной грани", () => {
		const point = { x: 0, y: -5 };

		const result = isPointOnRectBoundary(point, rect);
		expect(result).toBe(true);
	});

	it("должен возвращать false, если точка не лежит на грани", () => {
		const point = { x: -6, y: 0 };

		const result = isPointOnRectBoundary(point, rect);
		expect(result).toBe(false);
	});
});
