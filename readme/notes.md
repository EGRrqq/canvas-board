1) **Этап 1**: Преобразование входных данных с помощью функции преобразования.
	- Реализуйте функцию, которая **принимает** на вход **два** **прямоугольника** и **два** **подсоединения** (точка с углом), и **возвращает** **массив** **точек** для дальнейшей отрисовки.
		- Функция преобразования должна иметь следующий вид:```
			type Point = {  
			  x: number;  
			  y: number;  
			};  
			type Size = {  
			  width: number;  
			  height: number;  
			};  
			type Rect = {  
			  position: Point; // координата центра прямоугольника  
			  size: Size;  
			};  
			type ConnectionPoint = {  
			  point: Point;  
			  angle: number; // угол в градусах  
			};  
			  
			const dataConverter = (  
			  rect1: Rect,  
			  rect2: Rect,  
			  cPoint1: ConnectionPoint,  
			  cPoint2: ConnectionPoint  
			): Point[] => {  
			  // реализация алгоритма  
			};```
	- Не принимаются работы, где этот алгоритм написан через перебор.
		- **algo research**
			- Если прямоугольники пересекаются, можно добавить логику для обхода прямоугольников, используя более сложные алгоритмы, такие как **A\*** 
				1. **Оптимальность:** A* гарантирует нахождение кратчайшего пути, что важно для задачи, где требуется минимизировать количество поворотов и длину пути.
				2. **Гибкость:** A* может быть адаптирован для работы с различными типами препятствий и сложными условиями, такими как углы подсоединения.
				3. **Зрелость и поддержка:** A* широко используется и хорошо документирован, что упрощает разработку и отладку.
			- теория:
				- [https://dev.to/excaliburjs/pathfinding-part-2-with-a-ina](https://dev.to/excaliburjs/pathfinding-part-2-with-a-ina)  
				- https://en.wikipedia.org/wiki/A*_search_algorithm
	- Прямоугольники заданы их центром и размерами
		1. **Упрощение вычислений**: Зная центр и размеры, можно легко вычислить координаты углов прямоугольника. Позволяет быстро определять его положение и размеры без необходимости учитывать каждую из вершин отдельно.
		2. **Удобство при трансформациях**: Перемещение, масштабирование или вращение, использование центра позволяет легко изменять положение и размеры прямоугольника. Если нужно переместить прямоугольник, достаточно изменить координаты центра, а размеры останутся прежними.
		3. **Геометрические операции**:  Пересечение, объединение или проверка на пересечение, могут быть проще реализованы, когда прямоугольники описаны через центр и размеры. Это позволяет использовать более простые математические формулы и алгоритмы.
		4. **Адаптивность**: Такой способ описания позволяет легко адаптировать прямоугольники к различным системам координат и масштабам. 
		5. **Упрощение коллизий**: Если необходимо проверять столкновения между объектами, использование центра и размеров позволяет быстро определить, пересекаются ли два прямоугольника, используя простые математические проверки.
		6. **Легкость в визуализации**: При визуализации объектов проще работать с центром и размерами, так как это позволяет легко размещать и изменять объекты на экране.
	- **Углы подсоединения** (в градусах) должны быть **перпендикулярны** и н**аправлены наружу относительно границ прямоугольников**.
		1. **Логика взаимодействия**: При перетаскивание объектов, изменение размеров и т.д. Перпендикулярные углы могут помочь в создании более интуитивно понятного интерфейса. 
		2. **Упрощение расчетов**: Использование перпендикулярных углов может упростить математические расчеты, связанные с позиционированием и размером объектов. Это может быть полезно при разработке алгоритмов для обработки коллизий или других геометрических операций.
	- На этапе преобразования данных функция должна:
		- **Обрабатывать** все возможные **ошибки**, например:
			  - Точка подсоединения не лежит на грани прямоугольника.
			  - Угол подсоединения не направлен перпендикулярно и наружу от грани прямоугольника.
		- **Вычислить массив точек**, который **представляет** собой **ломаную линию**, соединяющую два прямоугольника с учётом переданных точек и углов.
	- Покрытие тестами алгоритма.
		- vitest
1) **Этап 2**: Использование полученных данных для отрисовки графики на HTML-элементе `<canvas>`.
	- Используйте Canvas API для **отрисовки** двух **прямоугольников** и **ломаной** **линии**, рассчитанной на первом этапе.
	1. Создайте элемент `<canvas>`.
	2. **Отрисуйте** на нём **два прямоугольника**, используя координаты и размеры, переданные на первом этапе.
	3. **Отрисуйте** **ломаную линию**, используя массив точек, полученный из функции dataConverter.
	4. **Используйте только** стандартные возможности **Canvas API**.
	5. **Добавить фоновую сетку**
	6. Реализовать **перетаскивание** прямоугольников мышью, кнопками на клавиатуре или экране. 
	7. Реализовать **изменение подсоединения линии** к этим прямоугольникам
	8. Пример
		- ![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXdjd2N_u9DorxA54TnaFDDYIxE9Y94NYEmGVrDOXgDBHU6-E0oNhb3K_SVRZBJmdEBw_TZtMUcr0C1AQMkOeK3VDrKHZ4H4gL8hvqyna_g67j5GK6tLi1IQ7swI9DhWBaLCVgc7DS1ddM-U7RxnNgo-lw3S?key=TPOewFbxm5peFBMuKvdyfQ)![](https://lh7-rt.googleusercontent.com/docsz/AD_4nXfTbV741c21DyydaDeXhUyUwBX5DYpPksgGPar5eF8V-sEWSNGnBPQImxa6DUgw7vWnk273GLqit4Bh7qF7-FMr7aMHbq-PjlJYMkcMWGp-FPExugo4dzC0VRKSaM6Lz25l_onTJh3Cuv4lI8s0xYiRaLSi?key=TPOewFbxm5peFBMuKvdyfQ)