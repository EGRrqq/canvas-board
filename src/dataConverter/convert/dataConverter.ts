import { Graph, type IGraphData } from "@/aStarAlgorithm";
import type { ConnectionPoint, Point, Rect } from "@/models";

import { getRectDimensions, getRectObstacles } from "@/dataConverter/rect";
import { validateConnectionPoint } from "@/dataConverter/validate";

export interface IConverterData {
	rect1: Rect;
	rect2: Rect;
	cPoint1: ConnectionPoint;
	cPoint2: ConnectionPoint;
}
export interface IConverterSettings {
	log: boolean;
}
const defaultSettings: IConverterSettings = {
	log: true,
};

type TDataConverter = (
	data: IConverterData,
	settings?: Partial<IConverterSettings>,
) => Promise<Point[]>;

export const dataConverter: TDataConverter = async (data, settings) => {
	// Объединение кастомных настроек с дефолтными значениями
	const s = { ...defaultSettings, ...settings };

	// Проверка корректности точек подсоединения
	validateConnectionPoint(data.cPoint1, data.rect1, "Точка подсоединения 1");
	validateConnectionPoint(data.cPoint2, data.rect2, "Точка подсоединения 2");

	// Определение размеров графа
	const graphDimensions = getRectDimensions(data.rect1, data.rect2);

	// Создание графа
	const graphData: IGraphData = {
		start: data.cPoint1.point,
		end: data.cPoint2.point,
		obstacles: getRectObstacles(data.rect1).concat(
			getRectObstacles(data.rect2),
		),
		width: graphDimensions.width,
		height: graphDimensions.height,
	};

	// Вычисление пути
	const path = await Graph.calcPath(graphData, { log: s.log });

	return path;
};
