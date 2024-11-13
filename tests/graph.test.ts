import { Graph, type IGraphData, type TGraph } from "@/aStarAlgorithm"; // Импортируйте вашу функцию init
import { describe, expect, expectTypeOf, it, vi } from "vitest";

describe("Инициализация графа", () => {
	// тесты на рендер графа

	it("должен корректно инициализировать граф, без препятствий", async () => {
		const data: IGraphData = {
			start: { x: 0, y: 0 },
			end: { x: 4, y: 4 },
			obstacles: [],
			width: 5,
			height: 5,
		};

		const graph = await Graph.init(data);

		// Проверяем, что граф инициализирован и имеет корректный тип
		expect(graph).toBeDefined();
		expectTypeOf(graph).toMatchTypeOf<TGraph>();

		// Проверяем, что граф имеет правильные размеры
		expect(graph.length).toBe(data.height);
		expect(graph[0].length).toBe(data.width);

		// Проверяем, что стартовая и конечная точки корректны
		expect(graph[data.start.y][data.start.x].traversable).toBe(true);
		expect(graph[data.end.y][data.end.x].traversable).toBe(true);
	});

	it("должен корректно устанавливать препятствия", async () => {
		const data: IGraphData = {
			start: { x: 0, y: 0 },
			end: { x: 4, y: 4 },
			obstacles: [
				{ x: 2, y: 2 },
				{ x: 3, y: 2 },
			],
			width: 5,
			height: 5,
		};

		const graph = await Graph.init(data);

		// Проверяем, что препятствия установлены правильно
		data.obstacles.map((o) => {
			expect(graph[o.y][o.x].traversable).toBe(false);
		});
	});

	it("должен игнорировать препятствия вне границ графа", async () => {
		const data: IGraphData = {
			start: { x: 0, y: 0 },
			end: { x: 4, y: 4 },
			obstacles: [{ x: 6, y: 6 }], // Препятствие вне границ
			width: 5,
			height: 5,
		};

		const graph = await Graph.init(data);

		// Проверяем, что все узлы в графе проходимы, так как препятствие вне границ
		for (let y = 0; y < data.height; y++) {
			for (let x = 0; x < data.width; x++) {
				expect(graph[y][x].traversable).toBe(true);
			}
		}
	});

	it("должен корректно рассчитывать gCost, hCost и fCost для узлов", async () => {
		const data: IGraphData = {
			start: { x: 0, y: 0 },
			end: { x: 4, y: 4 },
			obstacles: [],
			width: 5,
			height: 5,
		};

		const graph = await Graph.init(data);

		const startNode = graph[data.start.y][data.start.x];
		const endNode = graph[data.end.y][data.end.x];

		// Проверяем, что gCost, hCost и fCost рассчитаны правильно для стартового узла
		expect(startNode.gCost).toBe(0);
		expect(startNode.hCost).toBe(8); // Манхэттенское расстояние до (4, 4)
		expect(startNode.fCost).toBe(8); // gCost + hCost

		// Проверяем, что gCost, hCost и fCost рассчитаны правильно для конечного узла
		expect(endNode.gCost).toBe(8); // Манхэттенское расстояние от (0, 0)
		expect(endNode.hCost).toBe(0);
		expect(endNode.fCost).toBe(8); // gCost + hCost
	});

	it("должен вызываться log без ошибок и выводить ожидаемые сообщения", async () => {
		const data: IGraphData = {
			start: { x: 0, y: 0 },
			end: { x: 4, y: 4 },
			obstacles: [],
			width: 5,
			height: 5,
		};
		const expectedLog = [
			["S", "8", "8", "8", "8"],
			["8", "8", "8", "8", "8"],
			["8", "8", "8", "8", "8"],
			["8", "8", "8", "8", "8"],
			["8", "8", "8", "8", "E"],
		];

		// Мокаем console.log
		const consoleLogSpy = vi.spyOn(console, "log").mockImplementation(() => {});

		// Инициализируем граф и вызываем функцию log
		const graph = await Graph.init(data, { log: true });

		// Проверяем, что граф инициализирован и имеет корректный тип
		expect(graph).toBeDefined();
		expectTypeOf(graph).toMatchTypeOf<TGraph>();

		// Проверяем, что console.log был вызван с ожидаемыми аргументами
		expect(consoleLogSpy).toHaveBeenCalledWith(expectedLog);

		// Восстанавливаем оригинальную функцию console.log
		consoleLogSpy.mockRestore();
	});

	// тесты на выброс ошибок
	it("должен выбросить ошибку, если стартовая точка находится на препятствии", async () => {
		const data: IGraphData = {
			start: { x: 1, y: 1 },
			end: { x: 4, y: 4 },
			obstacles: [{ x: 1, y: 1 }],
			width: 5,
			height: 5,
		};

		await expect(Graph.init(data)).rejects.toThrow(/находится на препятствии/);
	});

	it("должен выбросить ошибку, если конечная точка находится на препятствии", async () => {
		const data: IGraphData = {
			start: { x: 0, y: 0 },
			end: { x: 1, y: 1 },
			obstacles: [{ x: 1, y: 1 }],
			width: 5,
			height: 5,
		};

		await expect(Graph.init(data)).rejects.toThrow(/находится на препятствии/);
	});

	it("должен выбросить ошибку, если стартовая точка вне границ графа", async () => {
		const data: IGraphData = {
			start: { x: 5, y: 5 },
			end: { x: 4, y: 4 },
			obstacles: [],
			width: 5,
			height: 5,
		};

		await expect(Graph.init(data)).rejects.toThrow(/нет в графе/);
	});

	it("должен выбросить ошибку, если конечная точка вне границ графа", async () => {
		const data: IGraphData = {
			start: { x: 0, y: 0 },
			end: { x: 5, y: 5 },
			obstacles: [],
			width: 5,
			height: 5,
		};

		await expect(Graph.init(data)).rejects.toThrow(/нет в графе/);
	});
});
