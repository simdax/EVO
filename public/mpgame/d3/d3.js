


// accepted
// You can use SVG filters.



d3.json('d3/treeData.json',function(err,data) {

    var treeData=data;

    // set the dimensions and margins of the diagram
    var margin = {top: 20, right: 90, bottom: 30, left: 90},
        width = 500 - margin.left - margin.right,
        height = 1000 - margin.top - margin.bottom;

    // declares a tree layout and assigns the size
    var treemap = d3.tree()
        .size([height, width]);

    //  assigns the data to a hierarchy using parent-child relationships
    var nodes = d3.hierarchy(treeData, function(d) {
        return d.children;
    });

    // maps the node data to the tree layout
    nodes = treemap(nodes);

    // append the svg object to the body of the page
    // appends a 'group' element to 'svg'
    // moves the 'group' element to the top left margin
    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);
    
    var g = svg.append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

    // adds the links between the nodes
    var link = g.selectAll(".link")
        .data( nodes.descendants().slice(1))
        .enter().append("path")
        .attr("class", "link")
        .style("stroke", function(d) { return d.data.level; })
        .attr("d", function(d) {
            return "M" + d.y + "," + d.x
                + "C" + (d.y + d.parent.y) / 2 + "," + d.x
                + " " + (d.y + d.parent.y) / 2 + "," + d.parent.x
                + " " + d.parent.y + "," + d.parent.x;
        });

    // adds each node as a group
    var node = g.selectAll(".node")
        .data(nodes.descendants())
        .enter().append("g")
        .attr("class", function(d) { 
            return "node" + 
                (d.children ? " node--internal" : " node--leaf"); })
        .attr("transform", function(d) { 
            return "translate(" + d.y + "," + d.x + ")"; });



    // Create filter:
    var filter = svg.append("defs")
        .append("filter")
        .attr("id", "blur")
        .append("feGaussianBlur")
        .attr("stdDeviation", 3); 

    // adds images as nodes
    node.append("image")
        .attr("xlink:href", function(d) { return d.data.icon; })
        .attr("width", "70px")
        .attr("height", "70px")
        .on("click", function(arg) {
            console.log(arg.data.name);
        })    
        .on("mouseover",function(a,b,c){
            d3.select(this).attr("filter", "url(#blur)");
        })
        .on("mouseout",function(){
            d3.select(this).attr("filter", null);
        });



    // adds the text to the node
    node.append("text")
        .attr("dy", ".70em")
        .attr("x", function(d) { return d.children ? -17 : 17; })
        .style("text-anchor", function(d) { 
            return d.children ? "end" : "start"; })
        .text(function(d) { return d.data.name; });

    //Use filter :


    function click(arg){
        console.log(arg)
    }

})


