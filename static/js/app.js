//json path for data
const jsonPath = "static/data/samples.json";

//grab data
d3.json(jsonPath).then((data) => {
    jsonData = data;

    //console.log(data);

    //initiatlization
    init();
});


//dropdown function
function init() {
    var dropdown = d3.select('#selDataset');
    jsonData.names.forEach((name) =>{
        dropdown.append('option').text(name).property('value',name);
    });
    active(jsonData.names[0])
};

//demographic function
function demographics(id) {
    var meta = jsonData.metadata.filter((x) => x.id === parseInt(id))[0];
    var demo = d3.select("#sample-metadata");
    demo.html("");
    Object.entries(meta).forEach(([key,value]) =>
        demo.append("h5").text('${key}: ${value)'));
};



//this will be used to activate functions

function active(id) {
    //demo stuff, bar chart, and bubble chart
    demographics(id);
    barchart(id);
    bubblechart(id);
}