export default async function() {
	const file = Bun.file('day-2/input.txt');
	const content = await file.text();
	const lines = content.trim().split('\n');

	const thresholds = {
		red: 12,
		green: 13,
		blue: 14,
	};

	let totalScore = 0;
	function parseLine(line: string) {
		let [gameId, setsLine] = line.split(':');
		let possible = true;

		setsLine.trim().split(';').forEach(setLine => {
			let cubes = { red: 0, green: 0, blue: 0 };
			const set = setLine.trim().split(',');
			for (const content of set) {
				let [amount, color] = content.trim().split(' ');
				// @ts-ignore
				cubes[color] = Number(amount);
				// @ts-ignore
				if (cubes[color] > thresholds[color]) {
					possible = false;
					break;
				}
			};
		});
		gameId = gameId.replace('Game ', '');
		if (possible) totalScore += Number(gameId);
	}

	console.log("Part 1");
	lines.forEach(parseLine);
	console.log(totalScore);
}

