export default async function() {
	const file = Bun.file('day-2/input.txt');
	const content = await file.text();
	const lines = content.trim().split('\n');

	let totalScore = 0;

	function parseLine(line: string) {
		const highestNumber = {
			red: 0,
			green: 0,
			blue: 0,
		};
		let [_, setsLine] = line.split(':');
		setsLine.trim().split(';').forEach(setLine => {
			const set = setLine.trim().split(',');
			for (const content of set) {
				let [amount, color] = content.trim().split(' ');
				// @ts-ignore
				if (Number(amount) > highestNumber[color]) {
					// @ts-ignore
					highestNumber[color] = Number(amount);
				}
			};
		});
		totalScore += highestNumber.red * highestNumber.green * highestNumber.blue;
	}

	console.log("Part 2");
	lines.forEach(parseLine);
	console.log(totalScore);
}
