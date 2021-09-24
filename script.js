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

	svg.selectAll("circle")
		.data(filtered)
		.enter()
		.append("circle")
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
		.attr("fill", "#69b3a2")

	svg.selectAll("text")
		.data(filtered)
		.enter()
		.append("text")
		.text(function(d){
			if (d.population > 1000000){
				return d.country;
			}
			else if (d.population < 1000000){
				return null;
			}
		})
		.attr("x", function(d){
			return x(d.x);
		})
		.attr("dy", function(d){
			return y(d.y-12);
		})
		.attr("font-size", 11)
		.attr("text-anchor", "middle")
})
//2. Load the CSV file
d3.csv('buildings.csv').then(data=>{
	//3. Sort the dataset based on the building height
	let sorted = data.sort(function(a,b){
		return b.height_ft - a.height_ft;
	});

	console.log('building_sorted', sorted);
	const width = 500;
	const height = 500;
	const svg = d3.select('.heightchart')
		.append('svg')
    	.attr('width', width)
    	.attr('height', height);

	svg.selectAll("rect")
		.data(sorted)
		.enter()
		.append("rect")
		.attr('width', d => d.height_px)
		.attr("height", d => 35)
		.attr("y", (d,i)=> (i*40))
		.attr("x", "220")
		.attr('fill', '#69b3a2')
		.on("mouseover", function(){
			d3.select(this).attr('fill','#74cfb9')
		})
		.on("mouseout", function(){
			d3.select(this).attr('fill', '#69b3a2')
		})
		.on("click",function(event, d){
			d3.select(".image")
			.attr("src", "/img/"+d.image)
			d3.select('.building-name')
			.html(d.building)
			d3.select(".height")
			.html(d.height_ft)
			d3.select(".city")
			.html(d.city)
			d3.select(".country")
			.html(d.country)
			d3.select(".floors")
			.html(d.floors)
			d3.select(".completed")
			.html(d.completed);
		})


	svg.selectAll(".category-label")
		.data(sorted)
		.enter()
		.append("text")
		.attr("class","text1")
		.attr('text-anchor','start')
		.attr("alignment-baseline", "hanging")
		.text(function(d){
			return d.building;
		})
		.attr('height',0)
		.attr("x",0)
		.attr("y", (d,i) => ((i*40)))
		.attr("dy", 10)
		.attr("font-size", 11)


	svg.selectAll(".value-label")
		.data(sorted)
		.enter()
		.append("text")
		.attr("class","value-label")
		.attr("alignment-baseline", "hanging") 
		.attr('text-anchor','end')
		.text(function(d){
			return d.height_ft + "  ft";
		})
		.attr("x",d => (d.height_px))
		.attr("y",(d,i)=> (i*40)+ 15)
		.attr("dy",-2)
		.attr("dx",214)
		.attr("font-size", 11)
		.attr("fill","white")







})








