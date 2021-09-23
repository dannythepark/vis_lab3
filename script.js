//load a dataset
d3.csv('cities.csv', d3.autoType).then(data=>{
	console.log('cities', data);
	//filters the dataset
	let filtered = data.filter(d => d.eu==true);
	console.log('cities_filtered', filtered);
	d3.select('.city-count').text("Number of Cities: "+ filtered.length);
	const width = 700;
	const height = 550;
	const svg = d3.select('.population-plot')
		.append('svg')
    	.attr('width', width)
    	.attr('height', height);

	var x = d3.scaleLinear().domain([0,700]).range([0,width]);
	var y = d3.scaleLinear().domain([0,550]).range([0,height]);

	var node = svg.selectAll("circle")
		.data(filtered)
		.enter()
	node.append("circle")
		.attr("fill", "#69b3a2")
		.attr("r", function(d){
			if (d.population > 1000000){
				return r = 8;
			}
			else if (d.population < 1000000){
				return r = 4;
			}
		})
		.attr("cx", function(d){
			return x(d.x);
		})
		.attr("cy", function(d){
			return y(d.y);
		})
		
})



