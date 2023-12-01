export default async function() {
	const file = Bun.file('day-1/input.txt');
	const content = await file.text();

	type Line = {
		firstNumber: string;
		lastNumber: string;
		index: number;
		combinedNumber: number;
	}
	const lines: Line[] = [];
	const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

	content.split('\n').forEach((line, index) => {
		if (line.length === 0) return;
		const digitsInLine = [];
		for (let i = 0; i < digits.length; i++) {
			const digit = digits[i];
			const firstIndex = line.indexOf(digit);
			const lastIndex = line.lastIndexOf(digit);
			if (firstIndex > -1) {
				digitsInLine.push({ digit, index: firstIndex });
				if (lastIndex !== firstIndex) {
					digitsInLine.push({ digit, index: lastIndex });
				}
			}
		}
		digitsInLine.sort((a, b) => a.index - b.index);
		lines.push({
			firstNumber: digitsInLine[0].digit,
			lastNumber: digitsInLine[digitsInLine.length - 1].digit,
			index: index,
			combinedNumber: parseInt(digitsInLine[0].digit + digitsInLine[digitsInLine.length - 1].digit)
		});
	});

	const total = lines.reduce((acc, curr) => {
		return acc + curr.combinedNumber;
	}, 0);

	console.log("Part 1");
	console.log(total);
}
