export default async function() {
	const file = Bun.file('day-6/input.txt');
	const content = await file.text();
	const lines = content.trim().split('\n');
	// @ts-ignore
	const time = parseInt(lines[0].match(/\d+/g).join(''));
	// @ts-ignore
	const distance = parseInt(lines[1].match(/\d+/g).join(''));


	const numberOfWaysToBeat = [];
	console.log("Part 2");
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
	const result = numberOfWaysToBeat.reduce((a, b) => a * b);
	console.log(result);

}
