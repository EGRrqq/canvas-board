import { validateConnectionPoint } from "@/dataConverter/validate";
import { describe, expect, it } from "vitest";

describe("validateConnectionPoint", () => {
	it("должен проходить валидацию для корректной точки подключения", () => {
		const rect = {
			position: { x: 5, y: 5 },
			size: { width: 4, height: 4 },
		};
		const cPoint = {
			point: { x: 3, y: 5 }, // Левая вертикальная граница
			angle: 90,
		};

		expect(() =>
			validateConnectionPoint(cPoint, rect, "Точка подсоединения"),
		).not.toThrow();
	});

	it("должен выбрасывать ошибку для точки, не лежащей на грани прямоугольника", () => {
		const rect = {
			position: { x: 5, y: 5 },
			size: { width: 4, height: 4 },
		};
		const cPoint = {
			point: { x: 5, y: 5 }, // Точка внутри прямоугольника
			angle: 90,
		};

		expect(() =>
			validateConnectionPoint(cPoint, rect, "Точка подсоединения"),
		).toThrow(
			/Точка подсоединения не лежит на грани прямоугольника. Допустимые точки:/,
		);
	});

	it("должен выбрасывать ошибку для угла, не перпендикулярного грани прямоугольника", () => {
		const rect = {
			position: { x: 5, y: 5 },
			size: { width: 4, height: 4 },
		};
		const cPoint = {
			point: { x: 3, y: 5 }, // Левая вертикальная граница
			angle: 45, // Неверный угол
		};

		expect(() =>
			validateConnectionPoint(cPoint, rect, "Точка подсоединения"),
		).toThrow(
			/Угол Точка подсоединения не перпендикулярен грани прямоугольника. Допустимые углы:/,
		);
	});

	it("должен выбрасывать ошибку для прямоугольника с нулевыми размерами", () => {
		const rect = {
			position: { x: 5, y: 5 },
			size: { width: 0, height: 0 },
		};
		const cPoint = {
			point: { x: 5, y: 5 },
			angle: 90,
		};

		expect(() =>
			validateConnectionPoint(cPoint, rect, "Точка подсоединения"),
		).toThrow(
			"Прямоугольник имеет нулевые размеры.\nТекущие размеры: ширина = 0, высота = 0",
		);
	});

	it("должен выбрасывать ошибку для прямоугольника с нулевой шириной", () => {
		const rect = {
			position: { x: 5, y: 5 },
			size: { width: 0, height: 4 },
		};
		const cPoint = {
			point: { x: 5, y: 5 },
			angle: 90,
		};

		expect(() =>
			validateConnectionPoint(cPoint, rect, "Точка подсоединения"),
		).toThrow(
			"Прямоугольник имеет нулевые размеры.\nТекущие размеры: ширина = 0, высота = 4",
		);
	});

	it("должен выбрасывать ошибку для прямоугольника с нулевой высотой", () => {
		const rect = {
			position: { x: 5, y: 5 },
			size: { width: 4, height: 0 },
		};
		const cPoint = {
			point: { x: 5, y: 5 },
			angle: 90,
		};

		expect(() =>
			validateConnectionPoint(cPoint, rect, "Точка подсоединения"),
		).toThrow(
			"Прямоугольник имеет нулевые размеры.\nТекущие размеры: ширина = 4, высота = 0",
		);
	});
});
