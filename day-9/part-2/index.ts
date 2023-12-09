export default async function() {
	const file = Bun.file('day-9/input.txt');
	const content = await file.text();
	const lines = content.trim().split('\n');

	console.log('Part 2');

	function getArrayOfDifferences(numbers: number[]) {
		const differences = [];
		// minus 1 because we always want a next number, and the last element doesn't have a next
		for (let i = 0; i < numbers.length - 1; i++) {
			const number = numbers[i];
			const nextNumber = numbers[i + 1];
			differences.push(nextNumber - number);
		}
		return differences;
	}

	let total = 0;
	for (let i = 0; i < lines.length; i++) {
		let numbers = lines[i].split(' ').map(Number);
		const levels = [];
		levels.push(numbers);
		let continueLoop = true;
		while (continueLoop) {
			const differences = getArrayOfDifferences(numbers);
			levels.push(differences);
			numbers = differences;
			if (!differences.find(difference => difference !== 0)) {
				continueLoop = false;
			}
		}
		// iterate levels backwards
		for (let j = levels.length - 1; j >= 0; j--) {
			const level = levels[j];
			if (j === levels.length - 1) {
				level.unshift(0);
				continue;
			}
			const previousLevel = levels[j + 1];
			const difference = previousLevel[0];
			const firstNumber = level[0];
			level.unshift(firstNumber - difference);
			if (j === 0) {
				total += firstNumber - difference;
			}
		}
	}
	console.log(total);
}
