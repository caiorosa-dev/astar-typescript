import Grid from '../types/Grid';
import Node from '../types/Node';
import Position from '../types/Position';
import { buildPath, calculateScores, getLowestFScoreNode, getNeighbors, removeNodeFromList } from './utils';

function AStar(grid: Grid, start: Position, end: Position): Node[] {
	let openList: Node[] = [];
	let closedList: Node[] = [];

	let startNode: Node = { x: start.y, y: start.x };
	const endNode: Node = { x: end.y, y: end.x };

	startNode = calculateScores(startNode, endNode);

	openList.push(startNode);

	while (openList.length > 0) {
		const currentNode = getLowestFScoreNode(openList);

		if (currentNode.x === endNode.x && currentNode.y === endNode.y) {
			return buildPath(currentNode);
		}

		openList = removeNodeFromList(currentNode, openList);
		closedList.push(currentNode);

		const neighbors = getNeighbors(grid, currentNode);

		for (const neighbor of neighbors) {
			if (closedList.some((node) => node.x === neighbor.x && node.y === neighbor.y)) {
				continue;
			}

			const neighborWithScores = calculateScores(neighbor, endNode);

			const openNode = openList.find((node) => node.x === neighbor.x && node.y === neighbor.y);

			if (openNode) {
				if (neighborWithScores.gScore < openNode.gScore) {
					openList = removeNodeFromList(openNode, openList);
					openList.push(neighborWithScores);
				}

				continue;
			}
			
			openList.push(neighborWithScores);
		}
	}

	console.log('❌ Não foi possível achar um caminho.');
}

export default AStar;