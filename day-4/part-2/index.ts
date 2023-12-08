export default async function() {
	const file = Bun.file('day-4/input.txt');
	const content = await file.text();
	const lines = content.trim().split('\n');
	let totalMatches = 0;
	let totalScore = 0;
	let cardMap: Record<string, number> = {};

	console.log("Part 2");

	for (let i = 0; i < lines.length; i++) {
		let line = lines[i];
		if (line === '') {
			continue;
		}
		// each card row
		let [winningNumbers, userNumbers] = line.replace(/^Card .*\d.*\: +/, '').split(' | ');

		// extract each side of the card and remove any empty strings
		let winningNumbersList = winningNumbers.split(' ').filter((number) => number !== '');
		let userNumbersList = userNumbers.split(' ').filter((number) => number !== '');
		// keep track of matched numbers to avoid duplicates
		let matchedNumbers: Record<string, boolean> = {};

		for (let number of winningNumbersList) {
			if (userNumbersList.includes(number) && !matchedNumbers.hasOwnProperty(number)) {
				// the winning number was part of the user's numbers and we haven't seen it before
				matchedNumbers[number] = true;
				totalMatches++;
			}
		}
		// this is the current card that we're processing and the number of copies that it has
		let cardId = (i + 1).toString();
		let cardCopies = cardMap[cardId] ? cardMap[cardId] + 1 : 0;

		for (let cardNumber = 0; cardNumber < totalMatches; cardNumber++) {
			// this is a calculated index that is used to find the cards below the one we're processing
			var idx = (i + cardNumber + 2).toString();
			if (cardMap.hasOwnProperty(idx)) {
				// we've seen this card before, update the number of copies by adding the number of copies of the card we're processing
				cardMap[idx] += cardCopies;
			} else {
				if (cardCopies > 0) {
					// we haven't seen this card before, but we have copies of the card we're processing, so add the number of copies of the card we're processing
					cardMap[idx] = cardCopies;
				} else {
					// we haven't seen this card before, and we don't have copies of the card we're processing, so add one
					cardMap[idx] = 1;
				}
			}
		}
		totalMatches = 0;
	}
	for (let cardNumber in cardMap) {
		totalScore += cardMap[cardNumber];
	}
	totalScore += lines.length;
	console.log(totalScore);
}
