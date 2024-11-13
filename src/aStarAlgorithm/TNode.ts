export type GraphNode = {
	x: number;
	y: number;
	traversable: boolean; // Можем ли мы пройти через этот узел
	gCost: number; // Стоимость от стартового узла
	hCost: number; // Эвристическая стоимость до конечного узла
	fCost: number; // Общая стоимость (gCost + hCost)
	parent?: GraphNode; // Узел-родитель для восстановления пути
};
