import { roundPoint, roundPoints } from '@/aStarAlgorithm/utils';
import { describe, expect, it } from 'vitest';

describe('roundPoint', () => {
  it('должен округлять координаты точки до ближайшего целого', () => {
    const point = { x: 1.4, y: 2.6 };
    const roundedPoint = roundPoint(point);
    expect(roundedPoint).toEqual({ x: 1, y: 3 });
  });

  it('должен округлять координаты точки с отрицательными значениями', () => {
    const point = { x: -1.4, y: -2.6 };
    const roundedPoint = roundPoint(point);
    expect(roundedPoint).toEqual({ x: -1, y: -3 });
  });

  it('должен возвращать точку с нулевыми координатами без изменений', () => {
    const point = { x: 0, y: 0 };
    const roundedPoint = roundPoint(point);
    expect(roundedPoint).toEqual({ x: 0, y: 0 });
  });
});

describe('roundPoints', () => {
  it('должен округлять координаты всех точек в массиве', () => {
    const points = [
      { x: 1.4, y: 2.6 },
      { x: 3.7, y: 4.1 },
    ];
    const roundedPoints = roundPoints(points);
    expect(roundedPoints).toEqual([
      { x: 1, y: 3 },
      { x: 4, y: 4 },
    ]);
  });

  it('должен округлять координаты точек с отрицательными значениями', () => {
    const points = [
      { x: -1.4, y: -2.6 },
      { x: -3.7, y: -4.1 },
    ];
    const roundedPoints = roundPoints(points);
    expect(roundedPoints).toEqual([
      { x: -1, y: -3 },
      { x: -4, y: -4 },
    ]);
  });

  it('должен возвращать пустой массив, если передан пустой массив', () => {
    const points: Point[] = [];
    const roundedPoints = roundPoints(points);
    expect(roundedPoints).toEqual([]);
  });
});
