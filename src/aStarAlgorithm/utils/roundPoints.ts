import type { Point } from "@/models";

export const roundPoint = (point: Point): Point => ({
	x: Math.round(point.x),
	y: Math.round(point.y),
});

export const roundPoints = (points: Point[]): Point[] => points.map(roundPoint);
