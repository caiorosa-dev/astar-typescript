import Grid from '../types/Grid';
import NeighborNode from '../types/NeighborNode';
import Node from '../types/Node';

function removeNodeFromList(node: Node, list: Node[]): Node[] {
	return list.filter((currentNode) => !(currentNode.x === node.x && currentNode.y === node.y));
}

function getLowestFScoreNode(list: Node[]): Node {
	return list.reduce((minNode, node) => (node.fScore < minNode.fScore ? node : minNode));
}

function isNodeValid(grid: Grid, node: Node) {
	const { x, y } = node;

	const isValidXPos = x >= 0 && x < grid.cols;
	const isValidYPos = y >= 0 && y < grid.rows;
	
	const isPathFree = isValidXPos && isValidYPos && grid.items[x][y] === 0;

	return isPathFree;
}

function calculateScores(node: Node, end: Node): Node {
	const { parent } = node;

	const gScore = parent ? (parent.gScore ? parent.gScore + 1 : 0) : 0;
	const hScore = calculateDistance(node, end);

	const fScore = gScore + hScore;

	return { ...node, fScore, gScore, hScore };
}

function calculateDistance(nodeA: Node, nodeB: Node): number {
	const distanceX = Math.abs(nodeA.x - nodeB.x);
	const distanceY = Math.abs(nodeA.y - nodeB.y);
	
	return distanceX + distanceY;
}

function getNeighbors(grid: Grid, node: Node): NeighborNode[] {
	const { x, y } = node;
	const neighbors: NeighborNode[] = [];
	
	// Left neighbor
	if (isNodeValid(grid, { x: x - 1, y })) {
		neighbors.push({ x: x - 1, y, parent: node });
	}

	// Right neighbor
	if (isNodeValid(grid, { x: x + 1, y })) {
		neighbors.push({ x: x + 1, y, parent: node });
	}

	// Down neighbor
	if (isNodeValid(grid, { x, y: y - 1 })) {
		neighbors.push({ x, y: y - 1, parent: node });
	}

	// Up neighbor
	if (isNodeValid(grid, { x, y: y + 1 })) {
		neighbors.push({ x, y: y + 1, parent: node });
	}

	return neighbors;
}

function buildPath(lastNode: Node) {
	const path: Node[] = [];
	let currentNode: Node | undefined = lastNode;

	while (currentNode) {
		path.push(currentNode);

		currentNode = currentNode.parent;
	}

	// It needs to be reversed because starts at the end
	return path.reverse();
}

export { getLowestFScoreNode, removeNodeFromList, isNodeValid, calculateScores, calculateDistance, getNeighbors, buildPath };
