export default interface Node {
	x: number;
	y: number;
	
	fScore?: number;
	gScore?: number;
	hScore?: number;
	parent?: Node;
}