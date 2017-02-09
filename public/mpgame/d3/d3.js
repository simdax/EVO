
d3.text("d3/inventaire.csv", function (datasetText) {
    var rows = d3.csvParseRows(datasetText);

    var tbl;
    tbl = d3.select("#inventaire")
        .append("table");

    // headers
    tbl.append("thead").append("tr")
        .selectAll("th")
        .data(rows[0])
        .enter().append("th")
        .text(function(d) {
            return d;
        });

    // data
    tbl.append("tbody")
        .selectAll("tr")
        .data(rows.slice(1))
        .enter().append("tr")

        .selectAll("td")
        .data(function(d){return d;})
        .enter().append("td")
        .text(function(d){

            // we put in a variable to be accessible
            if (!evo.table[d]) {evo.table[d]=[] };
            evo.table[d].push(d3.select(this));

            return d;
        })
        .attr("bgColor","blue")
        .on("click",function(a){
            if (a!="") {
                var b=d3.select(this);
                evo.game.board.mdj.toi.create(a);
                //                        b.attr("bgColor","red");
            }
        })

})
// .on("mouseover",function(a){
//     if (a!="") {
//         var a=d3.select(this);
//         if(a.attr("bgColor") != "red")
//         {
//             a.attr("bgColor","green")
//         }
//     }
// })
// .on("mouseout",function(a){
//     if (a!="") {
//         var a=d3.select(this);
//         if(a.attr("bgColor") != "red")
//         {
//             a.attr("bgColor","blue")
//         }
//     }
