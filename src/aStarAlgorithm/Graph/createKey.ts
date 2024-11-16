import type { Point } from "@/models";

export const createKey = (point: Point): string => `${point.x},${point.y}`;
