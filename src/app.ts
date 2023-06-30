import AStar from './algorithm';
import Grid from './types/Grid';

const grid: Grid = {
	cols: 5,
	rows: 5,
	items: [
		[0, 1, 0, 0, 0],
		[0, 1, 1, 1, 1],
		[0, 0, 0, 0, 0],
		[1, 1, 1, 1, 0],
		[0, 0, 0, 0, 0],
	]
}

const start = { x: 0, y: 0 };
const end = { x: 0, y: 4 };

const path = AStar(grid, start, end);

// Função para exibir o caminho encontrado no grid
function displayPath(grid, path) {
	for (let i = 0; i < path.length; i++) {
		const { x, y } = path[i];
		grid[x][y] = '*'; // Marcando o caminho com '*'
	}

	for (let i = 0; i < grid.length; i++) {
		console.log(grid[i].join(' '));
	}
}

displayPath(grid.items, path);
