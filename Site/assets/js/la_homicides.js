var w = 960,
    h = 600;
var projection = d3.geoAlbers()
    .scale(1)
    .translate([0, 0]);
var path = d3.geoPath().projection(projection);

var svg = d3.select('.svg-container')
    .append('svg')
    .attr('width',w)
    .attr('height',h)

d3.queue() 
    .defer(d3.json, "../assets/data/la_homicides_2004-2016.json")
    .defer(d3.json, "../assets/maps/la.json")
    .await(ready)
    
    function ready(error,homicides,la) {
        if (error) throw error;



        const laBounds = path.bounds(la);
        const laScale = 0.95 / Math.max(
                (laBounds[1][0] - laBounds[0][0]) / w,
                (laBounds[1][1] - laBounds[0][1]) / h
              );
        const laTranslate = [
            (w - laScale * (laBounds[1][0] + laBounds[0][0])) / 2, 
            (h - laScale * (laBounds[1][1] + laBounds[0][1])) / 2
        ];

      // Update the projection to use computed scale & translate.
      console.log(laBounds);
      console.log(laScale, laTranslate)
      projection.scale(laScale)
                  .translate(laTranslate);

        console.log(la);
        homicides.data.forEach(function(d) {
            d[26][1] = +d[26][1];
            d[26][2] = +d[26][2];
        })
        filtered_homicides = homicides.data.filter(function(d) {
            if (d[26][1] == 0) {
                return false;
            }
            if (d[26][2] > 0){
                return false;
            }
            if (d[26][1]<0){
                return false;
            }
            return true;
        })
        console.log(filtered_homicides);
        svg.append('path')
          .datum(la)
          .attr('d', path)
            .style('fill','white')
            .style('stroke','red');
/*
        svg.selectAll('.counties')
            .data(la)
                .enter().append('path')
            .attr('class','counties')
            .attr('d',path)
            .style('stroke','red')
            .style('fill','white')
            .style('stroke-width','.5px')
            .style('stroke-linejoin','round');
*/
        svg.selectAll('.murder')
            .data(filtered_homicides).enter().append('circle')
                .attr('class','murder')
                    .attr('r','1')
                    .attr('fill','blue')
                    .attr('cx',function(d) {
                        return projection([d[26][2],d[26][1]])[0];
                    })
                    .attr('cy',function(d){
                        return projection([d[26][2],d[26][1]])[1];
                    })
    }
