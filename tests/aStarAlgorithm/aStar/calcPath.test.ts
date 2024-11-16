import type { IGraphData } from "@/aStarAlgorithm";
import { calcPath } from "@/aStarAlgorithm/aStar";
import { describe, expect, it } from "vitest";

describe("calcPath", () => {
	it("должен найти путь от начальной точки до конечной точки без препятствий", async () => {
		const data: IGraphData = {
			start: { x: 0, y: 0 },
			end: { x: 2, y: 2 },
			obstacles: [],
			width: 3,
			height: 3,
		};

		const path = await calcPath(data);

		expect(path).toEqual([
			{ x: 0, y: 0 },
			{ x: 1, y: 0 },
			{ x: 2, y: 0 },
			{ x: 2, y: 1 },
			{ x: 2, y: 2 },
		]);
	});

	it("должен найти путь от начальной точки до конечной точки с препятствиями", async () => {
		const data: IGraphData = {
			start: { x: 0, y: 0 },
			end: { x: 2, y: 2 },
			obstacles: [{ x: 1, y: 1 }],
			width: 3,
			height: 3,
		};

		const path = await calcPath(data);

		expect(path).toEqual([
			{ x: 0, y: 0 },
			{ x: 1, y: 0 },
			{ x: 2, y: 0 },
			{ x: 2, y: 1 },
			{ x: 2, y: 2 },
		]);
	});

	it("должен выбросить ошибку, если путь не найден", async () => {
		const data: IGraphData = {
			start: { x: 0, y: 0 },
			end: { x: 2, y: 2 },
			obstacles: [
				{ x: 1, y: 0 },
				{ x: 1, y: 1 },
				{ x: 1, y: 2 },
			],
			width: 3,
			height: 3,
		};

		await expect(calcPath(data)).rejects.toThrow("Путь не найден");
	});

	it("должен выбросить ошибку, если стартовая точка не найдена в графе", async () => {
		const data: IGraphData = {
			start: { x: -1, y: -1 },
			end: { x: 2, y: 2 },
			obstacles: [],
			width: 3,
			height: 3,
		};

		await expect(calcPath(data)).rejects.toThrow(
			"Начальной точки (-1, -1) нет в графе",
		);
	});

	it("должен выбросить ошибку, если конечная точка не найдена в графе", async () => {
		const data: IGraphData = {
			start: { x: 2, y: 2 },
			end: { x: 2, y: -2 },
			obstacles: [],
			width: 3,
			height: 3,
		};

		await expect(calcPath(data)).rejects.toThrow(
			"Конечной точки (2, -2) нет в графе",
		);
	});
});
