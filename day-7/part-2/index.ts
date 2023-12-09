export default async function() {
	const file = Bun.file('day-7/input.txt');
	const content = await file.text();
	const lines = content.trim().split('\n');
	type HandMapItem = {
		hand: string;
		bid: number;
		handMap: Map<string, number>;
	};
	let score = 1;
	let totalScore = 0;
	console.log("Part 2");
	const allHands = new Map<string, HandMapItem[]>();
	const strengths = new Map();
	strengths.set('J', 1);
	strengths.set('2', 2);
	strengths.set('3', 3);
	strengths.set('4', 4);
	strengths.set('5', 5);
	strengths.set('6', 6);
	strengths.set('7', 7);
	strengths.set('8', 8);
	strengths.set('9', 9);
	strengths.set('T', 10);
	strengths.set('Q', 11);
	strengths.set('K', 12);
	strengths.set('A', 13);

	allHands.set('high card', []);
	allHands.set('one pair', []);
	allHands.set('two pairs', []);
	allHands.set('three of a kind', []);
	allHands.set('full house', []);
	allHands.set('four of a kind', []);
	allHands.set('five of a kind', []);


	// this function became super messy trying to account for all
	// scenarios where J can change the hand type
	// can probably be made a lot cleaner, but not for right now
	function evaluateHandType(handMap: Map<string, number>) {
		const jokerCount = handMap.get('J') || 0;
		if (handMap.size === 5) {
			if (jokerCount) {
				return 'one pair';
			}
			return 'high card';
		}
		if (handMap.size === 4) {
			const values = Array.from(handMap.values());
			if (jokerCount == 2) {
				return 'three of a kind';
			}
			if (jokerCount == 1) {
				if (values.includes(2)) {
					return 'three of a kind';
				}
				return 'two pairs';
			}
			return 'one pair';
		}
		if (handMap.size === 3) {
			const values = Array.from(handMap.values());
			if (jokerCount == 3) {
				return 'four of a kind';
			}
			if (jokerCount == 2) {
				return 'four of a kind';
			}
			if (jokerCount == 1) {
				if (values.includes(3)) {
					return 'four of a kind';
				}
				return 'full house';
			}
			if (values.includes(3)) {
				return 'three of a kind';
			}
			return 'two pairs';
		}
		if (handMap.size === 2) {
			const values = Array.from(handMap.values());
			if (values.includes(4)) {
				if (jokerCount) {
					return 'five of a kind';
				}
				return 'four of a kind';
			}
			if (jokerCount > 1) {
				return 'five of a kind';
			}
			if (jokerCount == 1) {
				return 'four of a kind';
			}
			return 'full house';
		}
		if (handMap.size === 1) {
			return 'five of a kind';
		}
		throw new Error('Invalid hand');
	}

	for (const line of lines) {
		const [hand, bidStr] = line.split(' ');
		const bid = parseInt(bidStr);
		const handMap = new Map();
		for (let index = 0; index < hand.length; index++) {
			const card = hand[index];
			if (handMap.has(card)) {
				handMap.set(card, handMap.get(card) + 1);
				continue;
			}
			handMap.set(card, 1);
		}
		const type = evaluateHandType(handMap);
		const handItem: HandMapItem = { hand, bid, handMap };
		const existingHands = allHands.get(type);
		allHands.set(type, [...existingHands!, handItem]);
	}
	for (const [type, hands] of allHands) {
		// console.log(type);
		hands.sort((a, b) => {
			const aHand = a.hand;
			const bHand = b.hand;
			for (let index = 0; index < aHand.length; index++) {
				const aCard = aHand[index];
				const bCard = bHand[index];
				if (strengths.get(aCard) > strengths.get(bCard)) {
					return 1;
				}
				if (strengths.get(aCard) < strengths.get(bCard)) {
					return -1;
				}
			}
			return 0;
		});
		for (const hand of hands) {
			totalScore += (hand.bid * score);
			// console.log(hand.hand, hand.bid, score, hand.bid * score);
			score++;
		}
	}
	// console.log(allHands);
	console.log(totalScore);

}
