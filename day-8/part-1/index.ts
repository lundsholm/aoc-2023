export default async function() {
	const file = Bun.file('day-8/input.txt');
	const content = await file.text();
	const lines = content.trim().split('\n');
	const directions = lines[0];
	const nodes = new Map();

	console.log("Part 1");

	for (let i = 2; i < lines.length; i++) {
		const line = lines[i];
		const [node, value] = line.split(' = ');
		const values = value.replace(/\(|\)/g, '').split(', ');
		nodes.set(node, values);
	}

	let jumps = 0;
	let nextValue = 'AAA';
	const target = 'ZZZ';

	for (let i = 0; i < directions.length; i++) {
		jumps++;
		const direction = directions[i] === 'L' ? 0 : 1;
		// navigate to the next node
		nextValue = nodes.get(nextValue)[direction];

		if (nextValue === target) {
			// we found the target
			console.log(jumps);
			break;
		}
		if (i === directions.length - 1) {
			// make sure the loop keeps looping
			i = -1;
		}
	}
};
