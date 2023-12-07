export default async function() {
	const file = Bun.file('day-3/input.txt');
	const content = await file.text();
	const lines = content.trim().split('\n');
	let numbers: number[] = [];

	for (let i = 0; i < lines.length; i++) {
		let line = lines[i];

		if (line === '') {
			continue;
		}

		const symbols = line.match(/[^a-zA-Z0-9.]/g) ?? [];
		symbols.forEach(symbol => {
			let symbolIndex = line.indexOf(symbol);
			let number = numberToTheLeft(line, symbolIndex);
			if (number) {
				numbers.push(parseInt(number));
			}
			number = numberToTheRight(line, symbolIndex);
			if (number) {
				numbers.push(parseInt(number));
			}
			if (i - 1 >= 0) {
				let aboveNumbers = numberOnLine(lines[i - 1], symbolIndex);
				if (aboveNumbers.length) {
					numbers = [...numbers, ...aboveNumbers];
				}
			}
			if (i + 1 < lines.length) {
				let belowNumbers = numberOnLine(lines[i + 1], symbolIndex);
				if (belowNumbers.length) {
					numbers = [...numbers, ...belowNumbers];
				}
			}
			line = line.replace(symbol, '.');
		});
	}
	console.log("Part 1");
	console.log(numbers.reduce((a, b) => a + b, 0));
}

const digits = '0123456789';

function numberToTheLeft(line: string, symbolIndex: number) {
	let number = '';
	let leftPosition = symbolIndex - 1;
	while (leftPosition >= 0 && digits.includes(line[leftPosition])) {
		number += line[leftPosition];
		leftPosition--;
	}
	if (number) number = number.split('').reverse().join('');
	return number;
}

function numberToTheRight(line: string, symbolIndex: number) {
	let number = '';
	let rightPosition = symbolIndex + 1;
	while (rightPosition < line.length && digits.includes(line[rightPosition])) {
		number += line[rightPosition];
		rightPosition++;
	}
	return number;
}

function numberHorizontaly(line: string, digitIndex: number) {
	// check if the number extends to the left
	let leftNumber = numberToTheLeft(line, digitIndex);
	let number = line[digitIndex];
	// check if the number extends to the right
	let rightNumber = numberToTheRight(line, digitIndex);
	// combine the numbers
	return leftNumber + number + rightNumber;
}

function numberOnLine(line: string, idx: number) {
	const numbers: number[] = [];
	let centerPosition = idx;
	let leftPosition = idx - 1;
	let rightPosition = idx + 1;

	if (digits.includes(line[centerPosition])) {
		const number = numberHorizontaly(line, centerPosition);
		if (number) {
			numbers.push(parseInt(number));
		}
	} else {
		if (digits.includes(line[leftPosition])) {
			const leftNumber = numberToTheLeft(line, centerPosition);
			if (leftNumber) {
				numbers.push(parseInt(leftNumber));
			}
		}
		if (digits.includes(line[rightPosition])) {
			const rightNumber = numberToTheRight(line, centerPosition);
			if (rightNumber) {
				numbers.push(parseInt(rightNumber));
			}
		}
	}
	return numbers;
}
