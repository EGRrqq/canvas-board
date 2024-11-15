import { getValidAngles } from "@/dataConverter/validate";
import { describe, expect, it } from "vitest";

const rect = {
	position: { x: 5, y: 5 },
	size: { width: 4, height: 4 },
};
describe("getValidAngles", () => {
	it("должен возвращать правильные углы для вертикальной грани", () => {
		const point = { x: 3, y: 5 }; // Левая вертикальная граница

		const result = getValidAngles(point, rect);
		expect(result).toEqual([90, 270]);
	});

	it("должен возвращать правильные углы для горизонтальной грани", () => {
		const point = { x: 5, y: 3 }; // Верхняя горизонтальная граница

		const result = getValidAngles(point, rect);
		expect(result).toEqual([0, 180]);
	});

	it("должен возвращать пустой массив для точки внутри прямоугольника", () => {
		const point = { x: 5, y: 5 }; // Точка внутри прямоугольника

		const result = getValidAngles(point, rect);
		expect(result).toEqual([]);
	});
});
