import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';



@Component({
  selector: 'app-barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BarchartComponent implements OnInit, OnChanges {
  @ViewChild('chart') private chartContainer: ElementRef;
  @Input() private data: Array<any>;
  private margin: any = { top: 20, bottom: 20, left: 20, right: 20};
  private chart: any;
  private width: number;
  private height: number;
  private xScale: any;
  private yScale: any;
  private colors: any;
  private xAxis: any;
  private yAxis: any;

  constructor() { }

  ngOnInit() {
    this.createChart();

  }

  ngOnChanges() {

  }



  createChart() {

    //data from csv file

    d3.csv('shipdata.csv',function(data){
      console.log("data",data);
      var shiplog = [];
      var len = data.length;

      for(var i=0;i<len;i++){
        if (i%2 !== 0) {
        console.log("data",data[i]);
        shiplog.push(data[i]);
        console.log("shiplog",shiplog);
        }
      }





var data = shiplog;

var margin = {top: 20, right: 20, bottom: 30, left: 40},
width = 960 - margin.left - margin.right,
height = 500 - margin.top - margin.bottom;
var y = d3.scaleBand()
      .range([height, 0])
      .padding(0.2);
var x = d3.scaleLinear()
      .range([0, width]);

var svg = d3.select("#svgArea").append("svg")

.attr("width", width + margin.left + margin.right)
.attr("height", height + margin.top + margin.bottom)
.append("g")
.attr("transform",
      "translate(" + margin.left + "," + margin.top + ")");

var tooltip = d3.select("body").append("div").attr("class","toolTip");

data.forEach(function(d) {
  console.log("d for don",d)
d.rate = +d.rate;
});

x.domain([0, d3.max(data, function(d){ return d.rate; })])
y.domain(data.map(function(d) { return d.rig; }));

svg.selectAll(".bar")
  .data(data)
  .enter().append("rect")
  .attr("class", "bar")
  .attr("width", function(d) {return x(d.rate); } )
  .attr("y", function(d) { return y(d.rig); })
  .attr("height", y.bandwidth());



svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .call(d3.axisBottom(x));
svg.append("g")
  .call(d3.axisLeft(y));


svg.selectAll(".bar")
  .on("mousemove", function(d){
            tooltip
              .style("left", d3.event.pageX - 50 + "px")
              .style("top", d3.event.pageY - 70 + "px")
              .style("display", "inline-block")
              .html("<br>" + "Country: " + (d.country) +
                    "<br>" + "Operator: " + (d.operator)+
                    "<br>" + "Operating_status: " + (d.operating_status)+
                    "<br>" + "Date_start: " + (d.date_start)+
                    "<br>" + "Date_end: " + (d.date_end)+
                    "<br>" + "Rate: " + (d.rate)+
                    "<br>" + "Rig: " + (d.rig));
        })
  .on("mouseout", function(d){ tooltip.style("display", "none");});



  var selection;

  var selector =   d3.select("#drop")
                      .attr("id","dropdown")
                      .on("change", function(d){
      selection = document.getElementById("dropdown").value;
                        console.log("selectValue",selection);
                        update(selection);
                      });

/*
svg.append("g")
    .attr("class", "brush")
    .call(d3.brushY()
        .extent([[0, 0], [width, height]])
        .on("brush", brushed));

function brushed() {
  if (d3.event.sourceEvent.type === "brush") return;
  var d0 = d3.event.selection.map(y.invert),
      d1 = d0.map(d3.timeDay.round);

  // If empty when rounded, use floor instead.
  if (d1[0] >= d1[1]) {
    d1[0] = d3.timeDay.floor(d0[0]);
    d1[1] = d3.timeDay.offset(d1[0]);
  }

  d3.select(this).call(d3.event.target.move, d1.map(y));
}
*/
function update (selection){
  console.log("selection",selection);

  d3.select("svg").remove();

  y.domain(data.map(function(d) {
      console.log("d selection", d[selection])
    return d[selection];

  }));
  var svg = d3.select("#svgArea").append("svg")



  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");


  var tooltip = d3.select("body").append("div").attr("class","toolTip");



  data.forEach(function(d) {
    console.log("d for don",d)
  d.rate = +d.rate;
  });

  x.domain([0, d3.max(data, function(d){ return d.rate; })])
  y.domain(data.map(function(d) { return d[selection]; }));

  svg.selectAll(".bar")
    .data(data)
    .enter().append("rect")
    .attr("class", "bar")

    .attr("width", function(d) {return x(d.rate); } )
    .attr("y", function(d) { return y(d[selection]); })
    .attr("height", y.bandwidth());



  svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  svg.append("g")
    .call(d3.axisLeft(y));

    svg.selectAll(".bar")
    .on("mousemove", function(d){
              tooltip
                .style("left", d3.event.pageX - 50 + "px")
                .style("top", d3.event.pageY - 70 + "px")
                .style("display", "inline-block")
                .html("<br>" + "Country: " + (d.country) +
                      "<br>" + "Operator: " + (d.operator)+
                      "<br>" + "Operating_status: " + (d.operating_status)+
                      "<br>" + "Date_start: " + (d.date_start)+
                      "<br>" + "Date_end: " + (d.date_end)+
                      "<br>" + "Rate: " + (d.rate)+
                      "<br>" + "Rig: " + (d.rig));
          })
    .on("mouseout", function(d){ tooltip.style("display", "none");});

/*
    svg.append("g")
        .attr("class", "brush")
        .call(d3.brushY()
            .extent([[0, 0], [width, height]])
            .on("brush", brushed));

    function brushed() {
      if (d3.event.sourceEvent.type === "brush") return;
      var d0 = d3.event.selection.map(y.invert),
          d1 = d0.map(d3.timeDay.round);

      if (d1[0] >= d1[1]) {
        d1[0] = d3.timeDay.floor(d0[0]);
        d1[1] = d3.timeDay.offset(d1[0]);
      }

      d3.select(this).call(d3.event.target.move, d1.map(y));
    }


*/
        }

     });

    }

  }
