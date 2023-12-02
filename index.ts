async function runDay(day: string) {
	try {
		const dayPath = `./day-${day}`;
		for (const part of ['part-1', 'part-2']) {
			const modulePath = `${dayPath}/${part}`;
			const module = await import(modulePath);
			await module.default();
		}
	} catch (e) {
		console.error(e);
	}
}

// check path parameter
const day = process.argv[2];
console.log(`advent of code 2023 day ${day}`);
console.log();
await runDay(day);
