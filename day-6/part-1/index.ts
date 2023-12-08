export default async function() {
	const file = Bun.file('day-6/input.txt');
	const content = await file.text();
	const lines = content.trim().split('\n');
	// @ts-ignore
	const times = lines[0].match(/\d+/g).map(x => parseInt(x));
	// @ts-ignore
	const distances = lines[1].match(/\d+/g).map(x => parseInt(x));

	const numberOfWaysToBeat = [];
	console.log("Part 1");
	for (let i = 0; i < times.length; i++) {
		const time = times[i];
		const distance = distances[i];
		let numberOfWays = 0;
		for (let j = 1; j < time + 1; j++) {
			const timeHeld = j;
			const timeLeft = time - j;
			const distanceTraveled = timeHeld * timeLeft;
			if (distanceTraveled > distance) {
				numberOfWays += 1;
			}

		}
		numberOfWaysToBeat.push(numberOfWays);
	}
	const result = numberOfWaysToBeat.reduce((a, b) => a * b);
	console.log(result);

};
