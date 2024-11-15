import { isRect } from "@/dataConverter/validate";
import { describe, expect, it } from "vitest";

describe("isRect", () => {
	it("должен возвращать true для прямоугольника с положительными размерами", () => {
		const rect = {
			position: { x: 5, y: 5 },
			size: { width: 4, height: 4 },
		};

		const result = isRect(rect);
		expect(result).toBe(true);
	});

	it("должен возвращать false для прямоугольника с нулевой шириной и положительной высотой", () => {
		const rect = {
			position: { x: 5, y: 5 },
			size: { width: 0, height: 4 },
		};

		const result = isRect(rect);
		expect(result).toBe(false);
	});

	it("должен возвращать false для прямоугольника с положительной шириной и нулевой высотой", () => {
		const rect = {
			position: { x: 5, y: 5 },
			size: { width: 4, height: 0 },
		};

		const result = isRect(rect);
		expect(result).toBe(false);
	});

	it("должен возвращать false для прямоугольника с нулевыми размерами", () => {
		const rect = {
			position: { x: 5, y: 5 },
			size: { width: 0, height: 0 },
		};

		const result = isRect(rect);
		expect(result).toBe(false);
	});
});
