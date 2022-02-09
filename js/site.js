function getParameters(){
	let url_string = window.location.href;
	let url = new URL(url_string);

	let lowerHipLine = url.searchParams.get("h");
	let hipLineDepth = url.searchParams.get("hd");
	let waist = url.searchParams.get("w");
	let skirtLength = url.searchParams.get("l");
	let bellyLineDepth = url.searchParams.get("bd");
	let bellyWidth = url.searchParams.get("b");
	console.log(waist);
	if(lowerHipLine && hipLineDepth && waist && skirtLength && bellyLineDepth && bellyWidth){
		console.log('updating measures');
		updateMeasurements(lowerHipLine,hipLineDepth,waist,skirtLength,bellyLineDepth,bellyWidth)
	}
}
