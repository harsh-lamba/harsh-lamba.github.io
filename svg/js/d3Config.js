var dataSet = [
              {"id": 35, "total": 1000, "placed": 450, "executed" : 500},
              {"id": 36, "total": 5000, "placed": 3000, "executed" : 2000},
              {"id": 37, "total": 9090, "placed": 2050, "executed" : 5000},
              {"id": 38, "total": 4000, "placed": 4500, "executed" : 500},
              {"id": 39, "total": 5500, "placed": 450, "executed" : 4500}
              ];
var w = 500, h = 200, padd = 10, marginLeft = 20;

//Created SVG container 
var svg = d3.select("body")
          .append("svg")
          .attr({
            "width" : w,
            "height" : h
          });
//Scaling of data
var yScale = d3.scale.linear()
              //.domain([0, d3.max(dataSet[0].total)])
              .domain([0, 10000])
              .range([0, w]);
//Iteration
dataSet.forEach(function(d, i){
  var grp = svg.append("g");
  var rect = grp.append("rect")
              .attr({
                "width" : function(){
                  return yScale(dataSet[i].total);
                  //return 200;
                },
                "height" : function(){
                  return h/dataSet.length - padd;
                },
                "x" : function(){
                  return marginLeft;
                },
                "y" : function(){
                  console.log(i);
                  return i * h/dataSet.length + padd;
                },
                "fill" : "#fff4ce"
              });

  var rect1 = grp.append("rect")
              .attr({
                "width" : function(){
                  return yScale(dataSet[i].placed);
                },
                "height" : function(d){
                  return h/dataSet.length -padd;
                },
                "x" : function(d){
                  return marginLeft;
                },
                "y" : function(d){
                  return i * h/dataSet.length + padd;
                },
                "fill" : "#fdbd5a"
              });

var rect3 = grp.append("rect")
              .attr({
                "width" : function(d){
                  //return dataSet[0].total;
                  return yScale(dataSet[i].executed);
                },
                "height" : function(d){
                  return h/dataSet.length - padd;
                },
                "x" : function(d){
                  return marginLeft;
                },
                "y" : function(d){
                  return i * h/dataSet.length + padd;
                },
                "fill" : "#fd8300"
              });
});
