import { isAngleCorrect } from "@/dataConverter/validate";
import { describe, expect, it } from "vitest";

const rect = {
	position: { x: 0, y: 0 },
	size: { width: 10, height: 10 },
};

describe("isAngleCorrect", () => {
	it("должен возвращать true, если угол перпендикулярен вертикальной грани", () => {
		const point = { x: -5, y: 0 };
		const angle = 90;

		const result = isAngleCorrect(angle, point, rect);
		expect(result).toBe(true);
	});

	it("должен возвращать true, если угол перпендикулярен горизонтальной грани", () => {
		const point = { x: 0, y: -5 };
		const angle = 0;

		const result = isAngleCorrect(angle, point, rect);
		expect(result).toBe(true);
	});

	it("должен возвращать false, если угол не перпендикулярен грани", () => {
		const point = { x: -5, y: 0 };
		const angle = 45;

		const result = isAngleCorrect(angle, point, rect);
		expect(result).toBe(false);
	});
});
