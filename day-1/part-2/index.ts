export default async function() {
	const file = Bun.file('day-1/input.txt');
	const content = await file.text();

	const digits = [
		{ digit: '1', word: 'one' },
		{ digit: '2', word: 'two' },
		{ digit: '3', word: 'three' },
		{ digit: '4', word: 'four' },
		{ digit: '5', word: 'five' },
		{ digit: '6', word: 'six' },
		{ digit: '7', word: 'seven' },
		{ digit: '8', word: 'eight' },
		{ digit: '9', word: 'nine' },
	];

	type Line = {
		firstNumber: string;
		lastNumber: string;
		index: number;
		combinedNumber: number;
	}
	const lines: Line[] = [];

	content.split('\n').forEach((line, index) => {
		// skip empty lines
		if (line.length === 0) return;
		const results = [];
		for (let i = 0; i < digits.length; i++) {
			const digit = digits[i];
			// try to find the index of the word and the digit
			const indexWord = line.indexOf(digit.word);
			const indexDigit = line.indexOf(digit.digit);
			const lastIndexWord = line.lastIndexOf(digit.word);
			const lastIndexDigit = line.lastIndexOf(digit.digit);

			if (indexWord > -1) {
				if (indexWord !== lastIndexWord) {
					// this is potentially both the first and last digit in the line, store both occurrences
					results.push({ index: lastIndexWord, value: digit.digit });
					results.push({ index: indexWord, value: digit.digit });
				} else {
					results.push({ index: indexWord, value: digit.digit });

				}
			}
			if (indexDigit > -1) {
				if (indexDigit !== lastIndexDigit) {
					// this is potentially both the first and last digit in the line, store both occurrences
					results.push({ index: lastIndexDigit, value: digit.digit });
					results.push({ index: indexDigit, value: digit.digit });
				} else {
					results.push({ index: indexDigit, value: digit.digit });
				}
			}

		}
		results.sort((a, b) => a.index - b.index);
		// combine the number with the lowest index with the number with the highest index
		lines.push({
			firstNumber: results[0].value,
			lastNumber: results[results.length - 1].value,
			index: index,
			combinedNumber: parseInt(results[0].value + results[results.length - 1].value)
		});
	});

	const total = lines.reduce((acc, curr) => {
		return acc + curr.combinedNumber;
	}, 0);

	console.log("Part 2");
	console.log(total);
}
