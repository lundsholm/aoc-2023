export default async function() {
	const file = Bun.file('day-5/input.txt');
	const content = await file.text();
	const lines = content.trim().split('\n');
	const seeds = lines[0].replace("seeds: ", "").split(' ').map(x => parseInt(x));
	const seedToSoilMap = parseSection("seed-to-soil map:", "soil-to-fertilizer map:");
	const soilToFertilizerMap = parseSection("soil-to-fertilizer map:", "fertilizer-to-water map:");
	const fertilizerToWaterMap = parseSection("fertilizer-to-water map:", "water-to-light map:");
	const waterToLightMap = parseSection("water-to-light map:", "light-to-temperature map:");
	const lightToTemperatureMap = parseSection("light-to-temperature map:", "temperature-to-humidity map:");
	const temperatureToHumidityMap = parseSection("temperature-to-humidity map:", "humidity-to-location map:");
	const humidityToLocationMap = parseSection("humidity-to-location map:");

	function parseSection(startMarker: string, endMarker?: string) {
		const start = lines.indexOf(startMarker);
		let end = lines.length;
		if (endMarker) {
			end = lines.indexOf(endMarker);
		}
		const section = lines.slice(start + 1, end - 1).map(line => line.split(' ').map(x => parseInt(x)));
		return section;
	}

	function isBetween(x: number, a: number, b: number) {
		return x >= a && x <= b;
	}

	function getValue(sourceValue: number, map: number[][]) {
		let destinationValue = sourceValue;
		for (let index = 0; index < map.length; index++) {
			const destinationStart = map[index][0];
			const sourceStart = map[index][1];
			const range = map[index][2];
			const isInRange = isBetween(sourceValue, sourceStart, sourceStart + range);
			if (isInRange) {
				const difference = sourceValue - sourceStart;
				destinationValue = destinationStart + difference;
				break;
			}
		}
		return destinationValue;
	}

	// const locationValues = [];
	let lowestLocationValue: number | undefined;
	for (let i = 0; i < seeds.length; i++) {
		const seed = seeds[i];
		const soilValue = getValue(seed, seedToSoilMap);
		// console.log(`soil value for seed ${seed} is ${soilValue}`);
		const fertilizerValue = getValue(soilValue, soilToFertilizerMap);
		// console.log(`fertilizer value for seed ${seed} is ${fertilizerValue}`);
		const waterValue = getValue(fertilizerValue, fertilizerToWaterMap);
		// console.log(`water value for seed ${seed} is ${waterValue}`);
		const lightValue = getValue(waterValue, waterToLightMap);
		// console.log(`light value for seed ${seed} is ${lightValue}`);
		const temperatureValue = getValue(lightValue, lightToTemperatureMap);
		// console.log(`temperature value for seed ${seed} is ${temperatureValue}`);
		const humidityValue = getValue(temperatureValue, temperatureToHumidityMap);
		// console.log(`humidity value for seed ${seed} is ${humidityValue}`);
		const locationValue = getValue(humidityValue, humidityToLocationMap);
		// locationValues.push(locationValue);
		// console.log(`location value for seed ${seed} is ${locationValue}`);
		if (lowestLocationValue === undefined || locationValue < lowestLocationValue) {
			lowestLocationValue = locationValue;
		}
	}
	// locationValues.sort((a, b) => a - b);


	console.log("Part 1");
	// console.log(seeds);
	// console.log(locationValues[0]);
	console.log(lowestLocationValue);

}
