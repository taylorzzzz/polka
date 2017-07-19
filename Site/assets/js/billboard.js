var psv = d3.dsvFormat("|");
d3.request("../assets/data/billboard_100_data.psv.txt")
	.mimeType("text/plain")
	.response(function(xhr) { return psv.parse(xhr.responseText) })
	.get(function(data) {
		console.log("pipe-delimited data:")

		data.forEach(function(d) {
			d["chart date"] = d["chart date"].substring(0,4);
		})


		var nest = d3.nest()
			.key(function(d) {return d.artist})
			.rollup(function(v) {return v.length})
			.entries(data)
			.sort(function(a,b){ return d3.descending(a.value, b.value);});

		var feat = data.filter(function(d) {
			return d.artist.includes('featuring');
		});
		var feat_nest = d3.nest()
			.key(function(d) {return d.artist})
			.rollup(function(v) {return v.length})
			.entries(feat)
			.sort(function(a,b) {return d3.descending(a.value,b.value)})
		var title_nest = d3.nest()
			.key(function(d) {return d.title})
			.entries(data)
			.sort(function(a,b) {return d3.descending(a.value,b.value)});
		console.log(title_nest);


	});
