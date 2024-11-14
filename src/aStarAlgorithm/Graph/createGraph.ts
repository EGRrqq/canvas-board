import type { IGraphData } from ".";
import type { TGraph } from "../models";

export const createGraph = (data: IGraphData): TGraph =>
	Array.from({ length: data.height }, (_, y) =>
		Array.from({ length: data.width }, (_, x) => ({
			x,
			y,
			traversable: true,
			gCost: 0,
			hCost: 0,
			fCost: 0,
		})),
	);
