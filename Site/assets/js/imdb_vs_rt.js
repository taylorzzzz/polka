/* HISTOGRAM ************************************************************/     

            /* Histogram Variables */
            var histoColumnWidth = parseFloat(d3.select('.left-column').style('width').replace('px','')),
                hist_margin = {top:(histoColumnWidth*.05) ,right:(histoColumnWidth*.05),bottom:(histoColumnWidth*.05),left:(histoColumnWidth*.05)},
                hist_width = histoColumnWidth - hist_margin.left - hist_margin.right,
                hist_height = histoColumnWidth/5 - hist_margin.top - hist_margin.bottom;
            var svg1 = d3.select('#tomatometer-hist').attr('width',hist_width+hist_margin.left+hist_margin.right).attr('height',hist_height+hist_margin.top+hist_margin.bottom),
                svg2 = d3.select('#audienceScore-hist').attr('width',hist_width+hist_margin.left+hist_margin.right).attr('height',hist_height+hist_margin.top+hist_margin.bottom),
                svg3 = d3.select('#audienceAVG-hist').attr('width',hist_width+hist_margin.left+hist_margin.right).attr('height',hist_height+hist_margin.top+hist_margin.bottom),
                svg4 = d3.select('#criticAVG-hist').attr('width',hist_width+hist_margin.left+hist_margin.right).attr('height',hist_height+hist_margin.top+hist_margin.bottom),
                svg5 = d3.select('#imdb-hist').attr('width',hist_width+hist_margin.left+hist_margin.right).attr('height',hist_height+hist_margin.top+hist_margin.bottom),
                
                g1 = svg1.append("g").attr("transform", "translate(" + hist_margin.left + "," + hist_margin.top + ")"),
                g2 = svg2.append("g").attr("transform", "translate(" + hist_margin.left + "," + hist_margin.top + ")"),
                g3 = svg3.append("g").attr("transform", "translate(" + hist_margin.left + "," + hist_margin.top + ")"),
                g4 = svg4.append("g").attr("transform", "translate(" + hist_margin.left + "," + hist_margin.top + ")"),
                g5 = svg5.append("g").attr("transform", "translate(" + hist_margin.left + "," + hist_margin.top + ")"),
                hist_tooltip = d3.select("body").append("div")
                    .attr("class", "hist_tooltip")
                    .attr("id","tp")
                    .style("opacity", 0);    
            /* Histogram Scales */       
            var hist_x_100 = d3.scaleLinear().range([0,hist_width]).domain([0,100]),
                hist_x_5 = d3.scaleLinear().range([0,hist_width]).domain([0,5]),
                hist_x_10 = d3.scaleLinear().range([0,hist_width]).domain([0,10]),
                hist_y_tomatometer = d3.scaleLinear().range([hist_height,0]),
                hist_y_audienceScore = d3.scaleLinear().range([hist_height,0]),
                hist_y_audienceAVG = d3.scaleLinear().range([hist_height,0]),
                hist_y_criticAVG = d3.scaleLinear().range([hist_height,0]),
                hist_y_imdb = d3.scaleLinear().range([hist_height,0]);
            /* Histogram Generators */
            var histogram_tomatometer = d3.histogram()
                .value(function(d) {return d.tomatometer})
                .domain(hist_x_100.domain())
                .thresholds(hist_x_100.ticks(20)),
                histogram_audienceScore = d3.histogram()
                    .value(function(d) {return d.audience_score})
                    .domain(hist_x_100.domain())
                    .thresholds(hist_x_100.ticks(20)),
                histogram_audienceAVG = d3.histogram()
                    .value(function(d) {return d.audience_AVG})
                    .domain(hist_x_5.domain())
                    .thresholds(hist_x_5.ticks(20)),
                histogram_criticAVG = d3.histogram()
                    .value(function(d) {return d.critic_AVG})
                    .domain(hist_x_10.domain())
                    .thresholds(hist_x_10.ticks(20));
                histogram_imdb = d3.histogram()
                    .value(function(d) {return d.imdb_rating})
                    .domain(hist_x_10.domain())
                    .thresholds(hist_x_10.ticks(20));


            /* Histogram Year Slider */
                /* HORIZONTAL SLIDER
                    var histSliderWidth = histoColumnWidth*.2;
                    var histSlider = d3.select('#year-slider'),
                        g_histSlider = histSlider.append("g").attr("transform", "translate(" + hist_margin.left + "," + hist_margin.top + ")"),
                        histSliderScale = d3.scaleLinear().range([0,hist_width]).domain([1915,2017]).clamp(true);
                    g_histSlider.append('rect').attr('width',hist_width).attr('height',1);
                    var span = g_histSlider.append('rect').attr('width',hist_width).attr('height',2).style('fill','461AFF').style('stroke-width','.5px');
                */
            var containerWidth = parseFloat(d3.select('#histo-container').style('width').replace('px','')),
                containerHeight = parseFloat(d3.select('#histo-container').style('height').replace('px','')),
                sliderMargin = {top:30,bottom:30},
                hist_slider_width = containerWidth * (.2),
                hist_slider_height = 400 - sliderMargin.top - sliderMargin.bottom;
            var hist_slider_vert = d3.select('#year-slider-v')
                        .attr('height',hist_slider_height+sliderMargin.top+sliderMargin.bottom)
                        .attr('width',hist_slider_width)
                        
                        .attr('transform','translate(0,'+(containerHeight-(hist_slider_height+sliderMargin.top+sliderMargin.bottom))/2+')');            
                gSliderV = hist_slider_vert.append("g")
                        .attr("transform", "translate(" + hist_slider_width/2 + "," + sliderMargin.top + ")"),
                fullSpan = gSliderV.append('rect')
                        .attr('width','.2px')
                        .attr('height',hist_slider_height)
                        .style('fill','#777')
                        .attr('transform','translate('+(-.1)+',0)'),  
                yearSpan = gSliderV.append('rect')
                        .attr('width','3px')
                        .attr('height',hist_slider_height)
                        .style('fill','#000')
                        .attr('transform','translate('+(-1.5)+',0)'),     
                sliderScaleV = d3.scaleLinear().range([hist_slider_height,0]).domain([1915,2017]).clamp(true);
                       
            /* Histogram Bin Declarations */
            var bins_tomatometer,
                bins_audienceScore,
                bins_audienceAVG,
                bins_criticAVG,
                bins_imdb;
/* SCATTER ************************************************************/  

            /* Scatter Variables */
            var scatterContainer = d3.select('.scatter-content');
            var scatter_container_width = parseFloat(scatterContainer.style('width').replace('px',''))-100;
            var scatter_svg = d3.select('svg.scatter-plot'),
                scatter_margin = {top:50,right:0,bottom:50,left:100},
                scatter_width = scatter_container_width - scatter_margin.left - scatter_margin.right,
                scatter_height = scatter_container_width - scatter_margin.top - scatter_margin.bottom,
                description = d3.select('#film-description');
            scatter_svg.attr('width',scatter_width+scatter_margin.left+scatter_margin.right)
                    .attr('height',scatter_height+scatter_margin.top+scatter_margin.bottom);
            var directorSel = d3.select('#director-filter'),
                xSel = d3.select('.xaxis-sel'),
                ySel = d3.select('.yaxis-sel'),
                directorFilter = d3.select('.dir-bar-container'),
                resetFilter = d3.select('#reset-dir-filter'),
                trendButton = d3.select('.trend-button');
            var div = d3.select("body").append("div")
                    .attr("class", "tooltip")
                    .style("opacity", 0),
                trendTip = d3.select("body").append("div")
                    .attr("class","trendtip")
                    .style("opacity",1);

            /* Scatter Scale & Axis */
            var scatter_x_5 = d3.scaleLinear().range([0,scatter_width]).domain([0,5]),
                scatter_x_10 = d3.scaleLinear().range([0,scatter_width]).domain([0,10]),
                scatter_x_100 = d3.scaleLinear().range([0,scatter_width]).domain([0,100]),
                ximdbCount = d3.scaleLog().range([0,scatter_width]).domain([10,2000000]),
                xrtCount = d3.scaleLog().range([0,scatter_width]).domain([10,4000000]),
                xYear = d3.scaleLinear().range([0,scatter_width]).domain([1915,2017]),

                scatter_y_5 = d3.scaleLinear().range([scatter_height,0]).domain([0,5]),
                scatter_y_10 = d3.scaleLinear().range([scatter_height,0]).domain([0,10]),
                scatter_y_100 = d3.scaleLinear().range([scatter_height,0]).domain([0,100]),
                yimdbCount = d3.scaleLog().range([scatter_height,0]).domain([10,2000000]),
                yrtCount = d3.scaleLog().range([scatter_height,0]).domain([10,4000000]);
            var scatter_xAxis = d3.axisBottom(scatter_x_100).tickSize(10).tickFormat(d3.format(',')),
                scatter_yAxis = d3.axisLeft(scatter_y_10).tickSizeInner(-scatter_width);
            var g = scatter_svg.append('g').attr('transform','translate(' + scatter_margin.left + ',' + scatter_margin.top + ')');  
            /* Scatter Event Listeners */
            directorSel.on('change',function(){
                var dir = this.options[this.selectedIndex].value;
                filterDirectors(dir);
            })
            resetFilter.on('click',function() {
                highlightDir('None');
                var active = document.getElementsByClassName('active-dir');
                            if (active.length>0) {
                                active[0].classList.remove('active-dir');
                            }
            });  
            /* Scatter Functions */
            function highlightDir(dir) {
                g.selectAll('.dot')
                    .classed('highlighted-dir',function(d) {
                        if (d.director.name == dir) {
                            return true;
                        }
                        else {
                            return false;
                        }
                    })
            }
            function filterDirectors(dir) {
                g.selectAll('.dot').transition().attr('r',3)
                if (dir == "all") {
                    g.selectAll('.dot').classed('hidden',false);
                }
                else {
                    var match;
                    g.selectAll('.dot')  
                        .classed('hidden',function(d) {
                            if (d.director.name != dir) {
                                match = false;
                                return true;
                                }
                                match = true;
                                return false;
                        })
                    }
                }
            function appendAxesSelectors(x,y) {
                x.append('option').text('Tomatometer').attr('value','tomatometer').attr('selected','selected');
                y.append('option').text('Tomatometer').attr('value','tomatometer');
                x.append('option').text('IMDb Score').attr('value','imdb_rating');
                y.append('option').text('IMDb Score').attr('value','imdb_rating').attr('selected','slected');
                x.append('option').text('RT Critic AVG').attr('value','critic_AVG');
                y.append('option').text('RT Critic AVG').attr('value','critic_AVG');
                x.append('option').text('RT Audience Score').attr('value','audience_score');
                y.append('option').text('RT Audience Score').attr('value','audience_score');
                x.append('option').text('RT Audience AVG').attr('value','audience_AVG');
                y.append('option').text('RT Audience AVG').attr('value','audience_AVG');
                x.append('option').text('IMDb Vote Count').attr('value','imdb_count');
                y.append('option').text('IMDb Vote Count').attr('value','imdb_count');
                x.append('option').text('RT User Vote Count').attr('value','audience_count');
                y.append('option').text('RT User Vote Count').attr('value','audience_count');
                x.append('option').text('Year').attr('value','year');                
            }
            function updatescatter_xAxis(val) {
                switch (val) {
                    case 'tomatometer': {
                        scatter_xAxis.scale(scatter_x_100).tickFormat(function(d) {return d + '%'}).ticks(10);
                        d3.select('.axis--x').transition().call(scatter_xAxis);
                        d3.selectAll('.dot')
                            .transition()
                            .duration(500)
                            .attr('cx',function(d) {return scatter_x_100(d.tomatometer)})
                        d3.select('.x-text').text('Tomatometer');
                        break;
                    }
                    case 'audience_score':  {
                        scatter_xAxis.scale(scatter_x_100).tickFormat(function(d) {return d + '%'}).ticks(10);
                        d3.select('.axis--x').transition().call(scatter_xAxis);
                        d3.selectAll('.dot')
                            .transition()
                            .duration(500)
                            .attr('cx',function(d) {return scatter_x_100(d.audience_score)})
                            d3.select('.x-text').text('Audience Score');
                        break;
                        }
                    case 'audience_AVG': {
                        scatter_xAxis.scale(scatter_x_5).tickFormat(d3.format(",")).ticks(5);
                        d3.select('.axis--x').transition().call(scatter_xAxis);
                        d3.selectAll('.dot')
                            .transition()
                            .duration(500)
                            .attr('cx',function(d) {return scatter_x_5(d.audience_AVG)})
                            d3.select('.x-text').text('RT Audience AVG');
                        break;
                        }
                    case 'critic_AVG': {
                        scatter_xAxis.scale(scatter_x_10).tickFormat(d3.format(",")).ticks(10);
                        d3.select('.axis--x').transition().call(scatter_xAxis);
                        d3.selectAll('.dot')
                            .transition()
                            .duration(500)
                            .attr('cx',function(d) {return scatter_x_10(d.critic_AVG)})
                            d3.select('.x-text').text('RT Critic AVG');
                        break;}
                    case('audience_count'): {
                        scatter_xAxis.scale(xrtCount).ticks(4).tickFormat(d3.format(","));
                        d3.select('.axis--x').transition().call(scatter_xAxis);
                        d3.selectAll('.dot')
                            .transition()
                            .duration(500)
                            .attr('cx',function(d) {console.log(d.audience_count);return xrtCount(d.audience_count)})
                            d3.select('.x-text').text('RT User Rating Count');
                        break;
                    }
                    case('imdb_rating'): {
                        scatter_xAxis.scale(scatter_x_10).tickFormat(d3.format(",")).ticks(10);
                        d3.select('.axis--x').transition().call(scatter_xAxis);
                        d3.selectAll('.dot')
                            .transition()
                            .duration(500)
                            .attr('cx',function(d) {return scatter_x_10(d.imdb_rating)})
                            d3.select('.x-text').text('IMDb Rating');
                        break;
                    }
                    case('imdb_count'): {
                        scatter_xAxis.scale(ximdbCount).ticks(2).tickFormat(d3.format(","));
                        d3.select('.axis--x').transition().call(scatter_xAxis);
                        d3.selectAll('.dot')
                            .transition()
                            .duration(500)
                            .attr('cx',function(d) {return ximdbCount(d.imdb_count)})
                            d3.select('.x-text').text('IMDb User Vote Count');
                        break;
                    }
                    case('year'): {
                        scatter_xAxis.scale(xYear).tickFormat(d3.format("0d")).ticks(10);
                        d3.select('.axis--x').transition().call(scatter_xAxis);
                        d3.selectAll('.dot')
                            .transition()
                            .duration(500)
                            .attr('cx',function(d) {return xYear(d.year)})
                            d3.select('.x-text').text('Year');
                        break;

                    }
                }
            }
            function updatescatter_yAxis(val) {
                switch (val) {
                    case 'tomatometer': {
                        scatter_yAxis.scale(scatter_y_100).tickFormat(function(d) {return d + '%'}).ticks(10);
                        d3.select('.axis--y').transition().call(scatter_yAxis);
                        d3.selectAll('.dot')
                            .transition()
                            .attr('cy',function(d) {return scatter_y_100(d.tomatometer)})
                            d3.select('.y-text').text('Tomatometer');
                        break;
                    }
                    case 'audience_score':  {
                        scatter_yAxis.scale(scatter_y_100).tickFormat(function(d) {return d + '%'}).ticks(10);
                        d3.select('.axis--y').transition().call(scatter_yAxis);
                        d3.selectAll('.dot')
                            .transition()
                            .duration(500)
                            .attr('cy',function(d) {return scatter_y_100(d.audience_score)})
                            d3.select('.y-text').text('RT Audience Score');
                        break;
                        }
                    case 'audience_AVG': {
                        scatter_yAxis.scale(scatter_y_5).tickFormat(d3.format(",")).ticks(5);
                        d3.select('.axis--y').transition().call(scatter_yAxis);
                        d3.selectAll('.dot')
                            .transition()
                            .duration(500)
                            .attr('cy',function(d) {return scatter_y_5(d.audience_AVG)})
                            d3.select('.y-text').text('RT Audience AVG');
                        break;
                        }
                    case 'critic_AVG': {
                        scatter_yAxis.scale(scatter_y_10).tickFormat(d3.format(",")).ticks(10);
                        d3.select('.axis--y').transition().call(scatter_yAxis);
                        d3.selectAll('.dot')
                            .transition()
                            .duration(500)
                            .attr('cy',function(d) {return scatter_y_10(d.critic_AVG)})
                            d3.select('.y-text').text('RT Critic AVG');
                        break;}
                    case('audience_count'): {
                        scatter_yAxis.scale(yrtCount).ticks(4).tickFormat(d3.format(","));
                        d3.select('.axis--y').transition().call(scatter_yAxis);
                        d3.selectAll('.dot')
                            .transition()
                            .duration(500)
                            .attr('cy',function(d) {return yrtCount(d.audience_count)})
                            d3.select('.y-text').text('RT Audience Vote Count');
                        break;
                    }
                    case('imdb_rating'): {
                        scatter_yAxis.scale(scatter_y_10).tickFormat(d3.format(",")).ticks(10);
                        d3.select('.axis--y').transition().call(scatter_yAxis);
                        d3.selectAll('.dot')
                            .transition()
                            .duration(500)
                            .attr('cy',function(d) {return scatter_y_10(d.imdb_rating)})
                            d3.select('.y-text').text('IMDb Rating');
                        break;
                    }
                    case('imdb_count'): {
                        scatter_yAxis.scale(yimdbCount).ticks(4).tickFormat(d3.format(","));
                        d3.select('.axis--y').transition().call(scatter_yAxis);
                        d3.selectAll('.dot')
                            .transition()
                            .duration(500)
                            .attr('cy',function(d) {return yimdbCount(d.imdb_count)})
                            d3.select('.y-text').text('IMDb Vote Count');
                        break;
                    }
                }
            }



//
/*********************************************************************************/
/********************************* Read in Data *********************************/
/*******************************************************************************/
d3.json('../assets/data/imdb_vs_rt.json',function(error,data){
    if (error) throw error;

/* HISTOGRAM DATA */
            /* Create Histogram Bins */
            bins_tomatometer = histogram_tomatometer(data),
            bins_audienceScore =  histogram_audienceScore(data),
            bins_audienceAVG = histogram_audienceAVG(data),
            bins_criticAVG =  histogram_criticAVG(data),
            bins_imdb =  histogram_imdb(data);
            /* Set Histogram Scale Domains */
            hist_y_tomatometer.domain([0, d3.max(bins_tomatometer, function(d) { return d.length; })]);
            hist_y_audienceScore.domain([0,d3.max(bins_audienceScore, function(d) { return d.length;})]),
            hist_y_audienceAVG.domain([0,d3.max(bins_audienceAVG, function(d) { return d.length;})]),
            hist_y_criticAVG.domain([0,d3.max(bins_criticAVG, function(d) { return d.length;})]),
            hist_y_imdb.domain([0,d3.max(bins_imdb, function(d) { return d.length;})]);
            /* Append Histograms */
            var barGap = 0;
            var hist1 = g1.selectAll("rect")
                .data(bins_tomatometer)
                .enter().append("rect")
                .attr("class", "bar")
                .attr("x", 1)
                .attr("transform", function(d) { 
                    return "translate(" + hist_x_100(d.x0) + "," + hist_y_tomatometer(d.length) + ")"; })
                .attr("width", function(d) { return hist_x_100(d.x1) - hist_x_100(d.x0) - barGap ; })
                .attr("height", function(d) { return hist_height - hist_y_tomatometer(d.length); })
                .on("mouseover", function(d) {
                        var totalLength = getBinLength(bins_tomatometer);
                        hist_tooltip.transition()
                        .duration(200)
                        .style("opacity", 1);
                        hist_tooltip.html('<span>'+((100*d.length/totalLength).toFixed(2)) + '%</span> (' + d.length+' out of '+ totalLength +') of sampled movies recieved a <span class="metric">Tomatometer Score</span> between <span>'+d.x0+'%</span> and <span>'+d.x1+'%</span>.')
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY - (document.getElementById('tp').clientHeight)) + "px")
                        d3.select(this).style('fill','white').style('stroke','#461AFF').style('stroke-width','.5px');
                        })
                    .on("mouseout", function(d) {
                        hist_tooltip.transition()
                        .duration(500)
                        .style("opacity", '0');
                        d3.select(this).style('fill','#461AFF').style('stroke','#000');
                    })
            g1.append('g').attr('class','histo-axis')
                .attr('transform','translate(0,' +hist_height+ ')')
                .call(d3.axisBottom(hist_x_100).ticks(2).tickFormat(function(d) {return d + '%'}));
            g1.append('text').text('Tomatometer')
                .attr('font-size','12px').attr('fill','#55545C').attr('dy','20px');
            var hist2 = g2.selectAll("rect")
                .data(bins_audienceScore)
                .enter().append("rect")
                .attr("class", "bar")
                .attr("x", 1)
                .attr("transform", function(d) { 
                    return "translate(" + hist_x_100(d.x0) + "," + hist_y_audienceScore(d.length) + ")"; })
                .attr("width", function(d) { return hist_x_100(d.x1) - hist_x_100(d.x0) - barGap; })
                .attr("height", function(d) { return hist_height - hist_y_audienceScore(d.length); })
                .on("mouseover", function(d) {
                        var totalLength = getBinLength(bins_audienceScore);
                        hist_tooltip.transition()
                        .duration(200)
                        .style("opacity", 1);
                        hist_tooltip.html('<span>'+((100*d.length/totalLength).toFixed(2)) + '%</span> (' + d.length+' out of '+ totalLength +')  of sampled movies recieved a <span class="metric">RT Audience Score</span> between <span>'+d.x0+'%</span> and <span>'+d.x1+'%</span>.')
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY - (document.getElementById('tp').clientHeight)) + "px")
                        d3.select(this).style('fill','white').style('stroke','#461AFF').style('stroke-width','.5px');
                        })
                    .on("mouseout", function(d) {
                        hist_tooltip.transition()
                        .duration(500)
                        .style("opacity", '0');
                        d3.select(this).style('fill','#461AFF').style('stroke','#000');
                    });
            g2.append('g').attr('class','histo-axis')
                .attr('transform','translate(0,' +hist_height+ ')')
                .call(d3.axisBottom(hist_x_100).ticks(2).tickFormat(function(d) {return d + '%'}));
            g2.append('text').text('RT Audience Score')
                .attr('font-size','12px').attr('fill','#55545C').attr('dy','20px');
            var hist3 = g3.selectAll("rect")
                .data(bins_audienceAVG)
                .enter().append("rect")
                .attr("class", "bar")
                .attr("x", 1)
                .attr("transform", function(d) { 
                    return "translate(" + hist_x_5(d.x0) + "," + hist_y_audienceAVG(d.length) + ")"; })
                .attr("width", function(d) { return hist_x_5(d.x1) - hist_x_5(d.x0) - barGap; })
                .attr("height", function(d) { return hist_height - hist_y_audienceAVG(d.length); })
                .on("mouseover", function(d) {
                        var totalLength = getBinLength(bins_audienceAVG);
                        hist_tooltip.transition()
                        .duration(200)
                        .style("opacity", 1);
                        hist_tooltip.html('<span>'+((100*d.length/totalLength).toFixed(2)) + '%</span> (' + d.length+' out of '+ totalLength +') of sampled movies recieved an <span class="metric">RT Audience AVG.</span> between <span>'+d.x0.toFixed(1)+'</span> and <span>'+d.x1.toFixed(1)+'</span>.')
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY - (document.getElementById('tp').clientHeight)) + "px")
                        d3.select(this).style('fill','white').style('stroke','#461AFF').style('stroke-width','.5px');
                        })
                    .on("mouseout", function(d) {
                        hist_tooltip.transition()
                        .duration(500)
                        .style("opacity", '0');
                        d3.select(this).style('fill','#461AFF').style('stroke','#000');
                    });
            g3.append('g').attr('class','histo-axis')
                .attr('transform','translate(0,' +hist_height+ ')')
                .call(d3.axisBottom(hist_x_5).ticks(5));
            g3.append('text').text('RT Audience AVG.')
                .attr('font-size','12px').attr('fill','#55545C').attr('dy','20px');
            var hist4 = g4.selectAll("rect")
                .data(bins_criticAVG)
                .enter().append("rect")
                .attr("class", "bar")
                .attr("x", 1)
                .attr("transform", function(d) { 
                    return "translate(" + hist_x_10(d.x0) + "," + hist_y_criticAVG(d.length) + ")"; })
                .attr("width", function(d) { return hist_x_10(d.x1) - hist_x_10(d.x0) - barGap; })
                .attr("height", function(d) { return hist_height - hist_y_criticAVG(d.length); })
                .on("mouseover", function(d) {
                        var totalLength = getBinLength(bins_criticAVG);
                        hist_tooltip.transition()
                        .duration(200)
                        .style("opacity", 1);
                        hist_tooltip.html('<span>'+((100*d.length/totalLength).toFixed(2)) + '%</span> (' + d.length+' out of '+ totalLength +') of sampled movies recieved an <span class="metric">RT Critic AVG.</span> between <span>'+d.x0.toFixed(1)+'</span> and <span>'+d.x1.toFixed(1)+'</span>.')
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY - (document.getElementById('tp').clientHeight)) + "px")
                        d3.select(this).style('fill','white').style('stroke','#461AFF').style('stroke-width','.5px');
                        })
                    .on("mouseout", function(d) {
                        hist_tooltip.transition()
                        .duration(500)
                        .style("opacity", '0');
                        d3.select(this).style('fill','#461AFF').style('stroke','#000');
                    });
            g4.append('g').attr('class','histo-axis')
                .attr('transform','translate(0,' +hist_height+ ')')
                .call(d3.axisBottom(hist_x_10).ticks(5));
            g4.append('text').text('RT Critic AVG.')
                .attr('font-size','12px').attr('fill','#55545C').attr('dy','20px');
            var hist5 = g5.selectAll("rect")
                .data(bins_imdb)
                .enter().append("rect")
                .attr("class", "bar")
                .attr("x", 1)
                .attr("transform", function(d) { 
                    return "translate(" + hist_x_10(d.x0) + "," + hist_y_imdb(d.length) + ")"; })
                .attr("width", function(d) { return hist_x_10(d.x1) - hist_x_10(d.x0) - barGap; })
                .attr("height", function(d) { return hist_height - hist_y_imdb(d.length); })
                .on("mouseover", function(d) {
                        var totalLength = getBinLength(bins_imdb);
                        hist_tooltip.transition()
                        .duration(200)
                        .style("opacity", 1);
                        hist_tooltip.html('<span>'+((100*d.length/totalLength).toFixed(2)) + '%</span> (' + d.length+' out of '+ totalLength +') of sampled movies recieved an <span class="metric">IMDb Rating </span> between <span>'+d.x0.toFixed(1)+'</span> and <span>'+d.x1.toFixed(1)+'</span>.')
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY - (document.getElementById('tp').clientHeight)) + "px")
                        d3.select(this).style('fill','white').style('stroke','#461AFF').style('stroke-width','.5px');
                        })
                    .on("mouseout", function(d) {
                        hist_tooltip.transition()
                        .duration(500)
                        .style("opacity", '0');
                        d3.select(this).style('fill','#461AFF').style('stroke','#000');
                    });
            g5.append('g').attr('class','histo-axis')
                .attr('transform','translate(0,' +hist_height+ ')')
                .call(d3.axisBottom(hist_x_10).ticks(5));
            g5.append('text').text('IMDb Score')
                .attr('font-size','12px').attr('fill','#55545C').attr('dy','20px');
            /* Append Year Slider for Histograms */
            /* HORIZONTAL SLIDER//
            var startCirc = g_histSlider.append('circle').attr('class','slider-c').attr('cx',0).attr('cy',0).attr('r',8)
                .style('stroke','#333').style('fill','white')
                .call(d3.drag()
                        .on('start drag', function() {handleStartDrag(histSliderScale.invert(d3.event.x))})
                ),
                endCirc = g_histSlider.append('circle').attr('class','slider-c').attr('cx',hist_width).attr('cy',0).attr('r',8)
                .style('stroke','#333').style('fill','white')
                .call(d3.drag()
                        .on('start drag', function() {handleEndDrag(histSliderScale.invert(d3.event.x))})
                )
            var yearLabel = g_histSlider.append('text')
                    .text(function() {return (histSliderScale.invert(startCirc.attr('cx'))+' - '+histSliderScale.invert(endCirc.attr('cx')))})
                    .attr('transform','translate('+(scatter_width/2)+',25)').attr('text-anchor','middle');
            */
            var startCircV = gSliderV.append('circle').attr('class','slider-c').attr('cx',0).attr('cy',hist_slider_height).attr('r',8)
                .style('stroke','#333').style('fill','white')
                .call(d3.drag()
                        .on('start drag', function() {handleStartDragV(sliderScaleV.invert(d3.event.y))})
                ),
                endCircV = gSliderV.append('circle').attr('class','slider-c').attr('cx',0).attr('cy',0).attr('r',8)
                .style('stroke','#333').style('fill','white')
                .call(d3.drag()
                        .on('start drag', function() {handleEndDragV(sliderScaleV.invert(d3.event.y))})
                );
            var yearLabelVRight = gSliderV.append('text').text(function() {return (sliderScaleV.invert(endCircV.attr('cy')))})
                    .attr('transform','translate(30,'+hist_slider_height/2 +')').attr('class','year-label').attr('text-anchor','middle');
            var yearLabelVLeft = gSliderV.append('text').text(function() {return (sliderScaleV.invert(startCircV.attr('cy')))})
                    .attr('transform','translate(-30,'+hist_slider_height/2 +')').attr('class','year-label').attr('text-anchor','middle');
            /* Histogram Functions (that require <data>)*/
            function handleStartDrag (pos) {
                var endYear = histSliderScale.invert(endCirc.attr('cx'));
                if (pos < endYear - endCirc.attr('r')/2-1) {
                    startCirc.attr('cx',histSliderScale(pos));
                    span.attr('x',histSliderScale(pos)).attr('width',endCirc.attr('cx')-startCirc.attr('cx'));
                    //update histograms 
                    var filteredData = data.filter(function(d){
                        if (d.year > Math.round(pos) && d.year < Math.round(endYear)) {return true}
                    })
                    drawHistogram(filteredData);
                    yearLabel.text(Math.round(pos) + ' - ' + Math.round(endYear));
                }
            }
            function handleEndDrag (pos) {
                var startYear = histSliderScale.invert(startCirc.attr('cx'));
                if (pos >  startYear + startCirc.attr('r')/2 + 1) {
                    endCirc.attr('cx',histSliderScale(pos));
                    span.attr('width',endCirc.attr('cx')-startCirc.attr('cx'));
                    var filteredData = data.filter(function(d){
                        if (d.year < Math.round(pos) && d.year > Math.round(startYear)) {return true}
                    })
                    drawHistogram(filteredData);
                    yearLabel.text(Math.round(startYear) + ' - ' + Math.round(pos));
                }
            }           
            function handleStartDragV (pos) {
                var endYear = sliderScaleV.invert(endCircV.attr('cy'));
                if (pos < endYear - endCircV.attr('r')/2-1) {
                    startCircV.attr('cy',sliderScaleV(pos));
                    yearSpan.attr('y',sliderScaleV(endYear)).attr('height',startCircV.attr('cy')-endCircV.attr('cy'));
                    //update histograms 
                    var filteredData = data.filter(function(d){
                        if (d.year > Math.round(pos) && d.year < Math.round(endYear)) {return true}
                    })
                    drawHistogram(filteredData);
                    yearLabelVLeft.text(Math.round(pos));
                }
            }
            function handleEndDragV (pos) {
                var startYear = sliderScaleV.invert(startCircV.attr('cy'));
                if (pos >  startYear + startCircV.attr('r')/2 + 1) {
                    endCircV.attr('cy',sliderScaleV(pos));
                    yearSpan.attr('y', sliderScaleV(pos)).attr('height',startCircV.attr('cy')-endCircV.attr('cy'));
                    var filteredData = data.filter(function(d){
                        if (d.year < Math.round(pos) && d.year > Math.round(startYear)) {return true}
                    })
                    drawHistogram(filteredData);
                    yearLabelVRight.text(Math.round(pos));
                }
            }      
            function drawHistogram(data) {
                bins_tomatometer = histogram_tomatometer(data),
                bins_audienceScore =  histogram_audienceScore(data),
                bins_audienceAVG = histogram_audienceAVG(data),
                bins_criticAVG =  histogram_criticAVG(data),
                bins_imdb =  histogram_imdb(data);

                hist_y_tomatometer.domain([0, d3.max(bins_tomatometer, function(d) { return d.length; })]);
                hist_y_audienceScore.domain([0,d3.max(bins_audienceScore, function(d) { return d.length;})]),
                hist_y_audienceAVG.domain([0,d3.max(bins_audienceAVG, function(d) { return d.length;})]),
                hist_y_criticAVG.domain([0,d3.max(bins_criticAVG, function(d) { return d.length;})]),
                hist_y_imdb.domain([0,d3.max(bins_imdb, function(d) { return d.length;})]);


                g1.selectAll("rect")
                    .data(bins_tomatometer)
                    .attr("transform", function(d) { 
                        return "translate(" + hist_x_100(d.x0) + "," + hist_y_tomatometer(d.length) + ")"; })
                    .attr("height", function(d) {return hist_height - hist_y_tomatometer(d.length); });
                g2.selectAll("rect")
                    .data(bins_audienceScore)
                    .attr("transform", function(d) { 
                        return "translate(" + hist_x_100(d.x0) + "," + hist_y_audienceScore(d.length) + ")"; })
                    .attr("height", function(d) {return hist_height - hist_y_audienceScore(d.length); });
                g3.selectAll("rect")
                    .data(bins_audienceAVG)
                    .attr("transform", function(d) { 
                        return "translate(" + hist_x_5(d.x0) + "," + hist_y_audienceAVG(d.length) + ")"; })
                    .attr("height", function(d) { return hist_height - hist_y_audienceAVG(d.length); });
                g4.selectAll("rect")
                    .data(bins_criticAVG)
                    .attr("transform", function(d) { 
                        return "translate(" + hist_x_10(d.x0) + "," + hist_y_criticAVG(d.length) + ")"; })
                    .attr("height", function(d) {return hist_height - hist_y_criticAVG(d.length); });
                g5.selectAll("rect")
                    .data(bins_imdb)
                    .attr("transform", function(d) { 
                        return "translate(" + hist_x_10(d.x0) + "," + hist_y_imdb(d.length) + ")"; })
                    .attr("height", function(d) { return hist_height - hist_y_imdb(d.length); });
            }
            function getBinLength(bin) {
                var totalLength = 0;
                bin.forEach(function(b) {
                    totalLength += b.length;
                })
                return totalLength;
            }

/* SCATTER DATA */
            /* Get Scatter Data Formatted */
            var directors = [];
            var scatter_data = data;
            scatter_data.forEach(function(d) {
                    d.year = +d.year;
                    d.imdb_rating = +d.imdb_rating;
                    d.imdb_count = +d.imdb_count;
                    d.tomatometer = +d.tomatometer;
                    d.audience_AVG = +d.audience_AVG;
                    d.audience_count = +d.audience_count;
                    if (d.audience_count > 3000000) {d.audience_count = d.audience_count/10}
                    d.audience_score = +d.audience_score;
                    d.critic_AVG = +d.critic_AVG;
                    d.fresh_count = +d.fresh_count;
                    d.rotten_count = +d.rotten_count;
                
                    if (directors.indexOf(d.director.name) == -1) {
                        directors.push(d.director.name);
                    }
                });
            directors.sort();
            directors.forEach(function(d) {
                directorSel.append('option').text(d).attr('value',d);
                directorFilter.append('div').attr('class','dir-bar')
                    .text(d).on('click',function() {
                        var active = document.getElementsByClassName('active-dir');
                        if (active.length>0) {
                            active[0].classList.remove('active-dir');
                        }
                        highlightDir(this.textContent);
                        this.classList.add('class','active-dir');
                    });
            });
            /* Append Scatter Axis Selectors */
            appendAxesSelectors(xSel,ySel);
            /* Scatter Event Listeners */
            xSel.on('change',function(){
                updatescatter_xAxis(this.value);
            })
            ySel.on('change',function(){
                updatescatter_yAxis(this.value);
            })      
            /* Append Scatter Axes */
            g.append('g').attr('transform','translate(0,' + scatter_height + ')').attr('class','axis axis--x').call(scatter_xAxis);
            g.append("text").attr('class','y-text').attr("y",-scatter_margin.left/2).attr("x", -scatter_height/2).attr('dy',-10)
                    .style("text-anchor", "middle").attr('transform','rotate(-90)')
                    .text("IMDB RATING");
            g.append('g').attr('class','axis axis--y').call(scatter_yAxis);
            g.append("text").attr('class','x-text').attr("x", scatter_width/2 ).attr("y",  scatter_height).attr('dy',50)
                .style("text-anchor", "middle")
                .text("TOMATOMETER");;
            /* Append Scatter Dots */
            g.selectAll('.dot').data(scatter_data).enter().append('circle')
                .attr('class','dot')
                .attr('r',3)
                .attr('cx',function(d) {return scatter_x_100(d.tomatometer)})
                .attr('cy',function(d) {return scatter_y_10(d.imdb_rating)})
                .style("fill", '#461AFF')
                .style('opacity','.3')
                .on("mouseover", function(d) {
                    div.transition().duration(200).style("opacity", 1);
                    div.html('<b><strong>' + d.title + '</strong></b>' +"<br/>IMDB: <span>" + d.imdb_rating + "</span></br>RT: <span>" + d.tomatometer +"%</span>")
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY - 80) + "px");
                    d3.select(this).style('fill','white').style('opacity',1).style('stroke','#000').attr('r',6);                        
                })
                .on("mouseout", function(d) {
                    div.transition().duration(500).style("opacity", '0');
                    d3.select(this).style('fill','#461AFF').style('opacity','.3').style('stroke','none').attr('r',3);
                    })
                .on('click', function(d) {
                    description.selectAll('p').remove();
                    description.append('p').html('<strong>Title:</strong>  <em>' + d.title + '</em>');
                    description.append('p').html('<strong>Director:</strong> ' + d.director.name);
                    description.append('p').html('<strong>Year:</strong> ' + d.year);
                    description.append('p').html('<strong>IMDb Rating:</strong> ' + d.imdb_rating + ' / 10');
                    description.append('p').html('<strong>IMDb Votes:</strong> ' + d3.format(',.2r')(d.imdb_count));
                    description.append('p').html('<strong>Tomatometer:</strong> ' + d.tomatometer + '%');
                    description.append('p').html('<strong>Critic AVG:</strong> ' + d.critic_AVG + ' / 10');
                    description.append('p').html('<strong>Audience Score:</strong> ' + d.audience_score + '%');
                    description.append('p').html('<strong>Audience AVG:</strong> ' + d.audience_AVG + ' / 5');
                    description.append('p').html('<strong>Audience Votes:</strong> ' + d3.format(',.2r')(d.audience_count));
                });
            /* Append Slope-of-1 Line */
            g.append('line').attr('x1',0).attr('x2',scatter_width).attr('y1',scatter_height).attr('y2',0)
                    .attr('stroke','#000').attr('stroke-dasharray','2').style('opacity',.4);
/**/
    
})
/*****************************************************************************/
/********************************* Did That *********************************/
/***************************************************************************/
        




 