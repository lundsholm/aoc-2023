export default async function() {
	const file = Bun.file('day-4/input.txt');
	const content = await file.text();
	const lines = content.trim().split('\n');
	let totalMatches = 0;
	let totalScore = 0;

	console.log("Part 1");

	for (let line of lines) {
		if (line === '') {
			continue;
		}
		let [winningNumbers, userNumbers] = line.replace(/^Card .*\d.*\: +/, '').split(' | ');
		let winningNumbersList = winningNumbers.split(' ').filter((number) => number !== '');
		let userNumbersList = userNumbers.split(' ').filter((number) => number !== '');
		let cardScore = 0;
		let matchedNumbers: Record<string, boolean> = {};
		for (let number of winningNumbersList) {
			if (userNumbersList.includes(number) && !matchedNumbers.hasOwnProperty(number)) {
				matchedNumbers[number] = true;
				totalMatches++;
				if (totalMatches === 1) {
					cardScore = 1;
				} else if (totalMatches > 1) {
					cardScore = cardScore * 2;
				}
			}
		}
		totalScore += cardScore;
		totalMatches = 0;
		matchedNumbers = {};
	}
	console.log(totalScore);
}
