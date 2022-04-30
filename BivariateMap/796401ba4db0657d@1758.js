function _1(md){return(
md`# DongDong estuary Map`
)}

function _colors(Inputs,schemes){return(
Inputs.select(new Map(schemes.map(s => [s.name, s.colors])), {key: "BuPu", label: "Color scheme"})
)}

function _var1(Inputs,feat_config){return(
Inputs.select(new Map(feat_config.map(s => [s.name, s.feat])), {key: "employ", label: "var1"})
)}

function _var2(Inputs,feat_config){return(
Inputs.select(new Map(feat_config.map(s => [s.name, s.feat])), {key: "graduate", label: "var2"})
)}

function _chart(d3,bbox,legend,c,color,data,path,format,interiors)
{
  const svg = d3.create("svg")
      .attr("viewBox", bbox)
      .attr('transform', 'rotate(180) matrix(-1, 0, 0, 1, 0, 0) scale(1)')
      .attr('height', '1000')
      .attr('width', '500');
  
  const tooltip = d3.select("body")
      .append("div")
      .style("position", "absolute")
      .style("z-index", "10")
      .style("visibility", "hidden")
      .style("background", "#000")
      .text("a simple tooltip");

  svg.append(legend)
      .attr("transform", 'translate(434754 6399391.999999999)');

  svg.append("g")
    .selectAll("path")
    .data(c)
    .join("path")
      .attr("fill", d => color(data.get(d.properties.INSEE_COM)))
      .attr("d", path)
        .on("mouseover", function(d,i){
  				d3.select(this).attr("r", 5).attr('stroke', 'rgb(0,255,255)').attr('stroke-linecap', 'butt').attr('stroke-width', '600');
  			})
  			.on("mouseout", function(d){
  				d3.select(this).attr("r", 5).attr('stroke', 'rgb(255,255,255)').attr('stroke-linecap', 'butt').attr('stroke-width', '150');
  			})
    .append("title")
      .text(d => `${d.properties.NOM_COMM}
${format(data.get(d.properties.INSEE_COM))}`)
  
  svg.append("path")
      .datum(interiors)
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-width", '150')
      .attr("stroke-linejoin", "round")
      .attr("d", path);

  return svg.node();
}


function _bbox(){return(
[354754, 6329391.999999999, (447805 - 354754)*1, (6537990.999999999 - 6329391.999999999)*1]
)}

function _legend(DOM,svg,n,d3,colors,data,labels){return(
() => {
  const k = 4500;
  const arrow = DOM.uid();
  return svg`<g font-family=sans-serif font-size=1500>
  <g transform="translate(-${k * n / 2},-${k * n / 2}) rotate(-225 ${k * n / 2},${k * n / 2})">
    <marker id="${arrow.id}" markerHeight=10 markerWidth=10 refX=6 refY=3 orient=auto>
      <path d="M0,0L9,3L0,6Z" />
    </marker>
    ${d3.cross(d3.range(n), d3.range(n)).map(([i, j]) => svg`<rect id=${i}${j} width=${k} height=${k} x=${i * k} y=${(n - 1 - j) * k} fill=${colors[j * n + i]}>
      <title>${data.title[0]}${labels[j] && ` (${labels[j]})`}
${data.title[1]}${labels[i] && ` (${labels[i]})`}</title>
    </rect>`)}
    <line marker-end="${arrow}" x1=0 x2=${n * k} y1=${n * k} y2=${n * k} stroke=black stroke-width=200 />
    <line marker-end="${arrow}" y2=0 y1=${n * k} stroke=black stroke-width=200 />
    <text font-weight="bold" dy="1.2em" transform="rotate(90) translate(${n / 2 * k},6) matrix(-1, 0, 0, 1, 0, 0)" text-anchor="middle">${data.title[0]}</text>
    <text font-weight="bold" dy="1.2em" transform="translate(${n / 2 * k},${n * k + 6}) matrix(-1, 0, 0, 1, 0, 0)" text-anchor="middle">${data.title[1]}</text>
  </g>
</g>`;
}
)}

function _schemes(){return(
[
  {
    name: "RdBu", 
    colors: [
      "#e8e8e8", "#e4acac", "#c85a5a",
      "#b0d5df", "#ad9ea5", "#985356",
      "#64acbe", "#627f8c", "#574249"
    ]
  },
  {
    name: "BuPu", 
    colors: [
      "#e8e8e8", "#ace4e4", "#5ac8c8",
      "#dfb0d6", "#a5add3", "#5698b9", 
      "#be64ac", "#8c62aa", "#3b4994"
    ]
  },
  {
    name: "GnBu", 
    colors: [
      "#e8e8e8", "#b5c0da", "#6c83b5",
      "#b8d6be", "#90b2b3", "#567994",
      "#73ae80", "#5a9178", "#2a5a5b"
    ]
  },
  {
    name: "PuOr", 
    colors: [
      "#e8e8e8", "#e4d9ac", "#c8b35a",
      "#cbb8d7", "#c8ada0", "#af8e53",
      "#9972af", "#976b82", "#804d36"
    ]
  }
]
)}

function _feat_config(){return(
[
  {name : 'none', feat : 'none'},
  {name : 'employ', feat : 'employ'}, 
  {name : 'graduate', feat : 'graduate'}, 
  {name : 'housing', feat: 'housing'}, 
  {name : 'agri', feat : 'agri'}]
)}

function _n(colors){return(
Math.floor(Math.sqrt(colors.length))
)}

function _y(d3,data,n){return(
d3.scaleQuantile(Array.from(data.values(), d => d[1]), d3.range(n))
)}

function _x(d3,data,n){return(
d3.scaleQuantile(Array.from(data.values(), d => d[0]), d3.range(n))
)}

function _color(colors,y,x,n)
{
  return value => {
    if (!value) return "#ccc";
    let [a, b] = value;
    return colors[y(b) + x(a) * n];
  };
}


function _format(data,labels,x,y){return(
(value) => {
  if (!value) return "N/A";
  let [a, b] = value;
  return `${a}% ${data.title[0]}${labels[x(a)] && ` (${labels[x(a)]})`}
${b}% ${data.title[1]}${labels[y(b)] && ` (${labels[y(b)]})`}`;
}
)}

function _labels(){return(
["low", "medium", "high"]
)}

function _projection(d3){return(
d3.geoAlbersUsa().scale(1300).translate([487.5, 305])
)}

function _path(d3){return(
d3.geoPath()
)}

function _topojson(require){return(
require("topojson-client@3")
)}

function _c(topojson,b){return(
topojson.feature(b, b.objects.estuary).features
)}

function _interiors(topojson,b){return(
topojson.mesh(b, b.objects.estuary, function(a, b) { return a !== b; })
)}

function _21(topojson,b){return(
topojson.bbox(b)
)}

function _b(FileAttachment){return(
FileAttachment("estuary.json").json()
)}

async function _data(d3,FileAttachment,var1,var2){return(
Object.assign(new Map(d3.csvParse(await FileAttachment("estuary@4.csv").text(), d => [d.country, [d[var1], d[var2]] ])), {title: [var1, var2]})
)}

function _estuary(a){return(
new Map(a.features.map(d => [parseInt(d.properties.INSEE_COM), {name: d.properties.NOM_COMM}]))
)}

function _a(FileAttachment){return(
FileAttachment("estuary.geojson").json()
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["estuary.geojson", {url: new URL("./files/44b00289a64e4ec7a6d7b58bccf3323d37a0c354774c929e25ac537af3a860266209fa921909a58f191434e07deac5b0cd5b8d4736566be32697f854ed854930", import.meta.url), mimeType: "application/geo+json", toString}],
    ["estuary.json", {url: new URL("./files/a69827ea6e3b62550b279f3223f29a67a0e26aa078c491921ee416d8feb66a514933ab1afc381315906ac3fd3290090b1f6bcf7680972084c83df0f2dd7e3abb", import.meta.url), mimeType: "application/json", toString}],
    ["estuary@4.csv", {url: new URL("./files/732bb3b3fc0b6cff120dbffd8425784eca8182ac73080549190bc3d8f8385bbbfcafee64fee4aa46de26d493067b1e7f483c02e919b19122089125a7f305b762", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("viewof colors")).define("viewof colors", ["Inputs","schemes"], _colors);
  main.variable(observer("colors")).define("colors", ["Generators", "viewof colors"], (G, _) => G.input(_));
  main.variable(observer("viewof var1")).define("viewof var1", ["Inputs","feat_config"], _var1);
  main.variable(observer("var1")).define("var1", ["Generators", "viewof var1"], (G, _) => G.input(_));
  main.variable(observer("viewof var2")).define("viewof var2", ["Inputs","feat_config"], _var2);
  main.variable(observer("var2")).define("var2", ["Generators", "viewof var2"], (G, _) => G.input(_));
  main.variable(observer("chart")).define("chart", ["d3","bbox","legend","c","color","data","path","format","interiors"], _chart);
  main.variable(observer("bbox")).define("bbox", _bbox);
  main.variable(observer("legend")).define("legend", ["DOM","svg","n","d3","colors","data","labels"], _legend);
  main.variable(observer("schemes")).define("schemes", _schemes);
  main.variable(observer("feat_config")).define("feat_config", _feat_config);
  main.variable(observer("n")).define("n", ["colors"], _n);
  main.variable(observer("y")).define("y", ["d3","data","n"], _y);
  main.variable(observer("x")).define("x", ["d3","data","n"], _x);
  main.variable(observer("color")).define("color", ["colors","y","x","n"], _color);
  main.variable(observer("format")).define("format", ["data","labels","x","y"], _format);
  main.variable(observer("labels")).define("labels", _labels);
  main.variable(observer("projection")).define("projection", ["d3"], _projection);
  main.variable(observer("path")).define("path", ["d3"], _path);
  main.variable(observer("topojson")).define("topojson", ["require"], _topojson);
  main.variable(observer("c")).define("c", ["topojson","b"], _c);
  main.variable(observer("interiors")).define("interiors", ["topojson","b"], _interiors);
  main.variable(observer()).define(["topojson","b"], _21);
  main.variable(observer("b")).define("b", ["FileAttachment"], _b);
  main.variable(observer("data")).define("data", ["d3","FileAttachment","var1","var2"], _data);
  main.variable(observer("estuary")).define("estuary", ["a"], _estuary);
  main.variable(observer("a")).define("a", ["FileAttachment"], _a);
  return main;
}
