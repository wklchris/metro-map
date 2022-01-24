// Delet js-fallback item
document.getElementById('js-fallback').remove();


// Create the metro map SVG object
var dwg_width = 24000;
var dwg_height = 24000;

var svg_width = Math.max(window.innerWidth * 0.95, 700);
var svg_height = parseInt(dwg_height / dwg_width * svg_width);
var svg_staion_radius = 60 / dwg_width * svg_width;
var svg = d3.select("body").append("svg")
  .attr("id", "metromap")
  .attr("width", svg_width)
  .attr("height", svg_width);

// Define DWG-to-SVG coordinates offsets
// Transform: (Note that SVG's y-axis is reversed)
//     (dwg_x0, dwg_y0) - (xoffset, yoffest) = (csv_x, csv_y)
//     (svg_x, svg_y) = (dwg_x0 / dwg_width, -dwg_y0 / dwg_height)

function dwg_xtransform(csv_x) {
  var dwg_xoffset = 13373.8832;
  return (csv_x + dwg_xoffset) / dwg_width * svg_width;
}
function dwg_ytransform(csv_y) {
  var dwg_yoffset = -14128.5372;
  return -(csv_y + dwg_yoffset) / dwg_height * svg_height
}

// Load CSV and interactive with user
d3.csv("data/shmetro-stations.csv").then(function(stations) {
  // Add SVG (x, y) based on the predefined SVG canvas size
  stations.forEach(function(d) {
    d.svg_x = dwg_xtransform(+d.x);
    d.svg_y = dwg_ytransform(+d.y);
  });

  // Draw stations
  svg.selectAll("circle")
      .data(stations).enter()
    .append("circle")
      .attr("class", "station")
      .attr("line", function(d) { return d.line; })
      .attr("display", function(d) { return d.display; })
      .attr("cx", function(d) { return +d.svg_x; })
      .attr("cy", function(d) { return +d.svg_y; })
      .attr("r", svg_staion_radius);
});


/* If CSV is preferred over JSON, use this loadCSV() function.
   Define 'stations' before this async function,
     then CSV data will be stored in it.

async function loadCSV() {
    stations = await d3.csv("data/shmetro-stations.csv", (d) => {
        // Process non-string columns
        return {
            name: d.name,
            line: d.line,
            display: d.display,
            display_en: d.display_en,
            seq: +d.seq,
            timestamp: +d.timestamp,
            restroom: +d.restroom,
            type: d.type,
            transfer_inside: d.transfer_inside,
            transfer_outside: d.transfer_outside,
            x: +d.x,
            y: +d.y,
            icon: d.icon
        };
    });
}
*/

