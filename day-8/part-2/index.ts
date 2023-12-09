export default async function() {
	const file = Bun.file('day-8/input.txt');
	const content = await file.text();
	const lines = content.trim().split('\n');
	const directions = lines[0];
	const nodes = new Map<string, [string, string]>();
	const currentNodes: { start: string, current: string, jumps: number }[] = [];
	const endNodes: { start: string, current: string, jumps: number }[] = [];
	console.log('Part 2');

	function gcd(a: number, b: number): number {
		while (b !== 0) {
			// temporarily save the original value of b
			let t = b;
			// set b to the remainder of a / b
			b = a % b;
			// set a to the original value of b
			a = t;
		}
		return a;
	}

	function lcm(a: number, b: number): number {
		return a * b / gcd(a, b);
	}

	function lcmArray(steps: number[]): number {
		// calculate the LCM of the first pair of numbers, then the LCM of that result and the third number, and so on, 
		// until we reach the end of the array and have the LCM of all numbers
		return steps.reduce((a, b) => lcm(a, b));
	}

	for (let i = 2; i < lines.length; i++) {
		const line = lines[i];
		const [node, value] = line.split(' = ');
		const [l, r] = value.replace(/\(|\)/g, '').split(', ');
		// structure each node inside our map, and it's value in an array so we can use 0 for left and 1 for right
		nodes.set(node, [l, r]);
		if (node[2] === 'A') {
			// get all the starting nodes
			currentNodes.push({ start: node, current: node, jumps: 0 });
		}
	}

	for (let i = 0; i < directions.length; i++) {
		const direction = directions[i] === 'L' ? 0 : 1;
		for (let j = 0; j < currentNodes.length; j++) {
			// find the next node for each starting node
			const nextValue = nodes.get(currentNodes[j].current)![direction];
			// update the current node and increment the jumps
			currentNodes[j].current = nextValue;
			currentNodes[j].jumps++;
			if (currentNodes[j].current[2] === 'Z' && endNodes.every(node => node.start !== currentNodes[j].start)) {
				// we found an end node, add it to the endNodes array
				endNodes.push({ ...currentNodes[j] });
				continue;
			}
		}
		if (endNodes.length === currentNodes.length) {
			// we found all the end nodes, break out of the loop
			console.log(endNodes);
			break;
		}
		if (i === directions.length - 1) {
			// make sure the loop keeps looping
			i = -1;
		}
	}
	const jumpsArray = endNodes.map(node => node.jumps);
	console.log(lcmArray(jumpsArray));
}
