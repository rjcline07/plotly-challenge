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

//barchart
function barchart(id) {
    var sample = jsonData.samples.filter(x => x.id.toString() === id)[0];
    //console.log(sample)

    //top 10 otus and their ids after mapping
    var topten = sample.otu_ids.slice(0, 10).reverse();
    var otuIDs = topten.map(x => "OTU " + x);

    // values and labels
    var values = sample.sample_values.slice(0, 10).reverse();
    var labels = sample.otu_labels.slice(0, 10).reverse();

    //trace
    var trace1 = [{
        type: "bar",
        x: values,
        y: otuIDs,
        text: labels,
        //ensures horizontal
        orientation: 'h'
    }];
    //layout
    var layout1 = {
        title: "Top 10 OTU Samples",
        xaxis: {title: "Sample Values"},
        yaxis: {title: "OTU ID"}
    };

    Plotly.newPlot('bar', trace1, layout1)
};

//bubblechart
function bubblechart(id) {
    var bubblesample = jsonData.samples.filter(x => x.id.toString() === id)[0];
    //create a variable for the OTU ids, values and sample labels like above
    var otuIDs = bubblesample.otu_ids
    var bubblevalues = bubblesample.sample_values
    var bubblelabels = bubblesample.otu_labels

    //trace
    var trace2 = [{
        x: otuIDs,
        y: bubblevalues,
        text: bubblelabels,
        mode: 'markers',
        marker: {
            color: otuIDs,
            size: bubblevalues,
            colorscale: 'Viridis'
        }
    }];
    

    var layout2 = {
        title: 'Bacterial Cultures per Sample',
        xaxis: {title: "OTU ID"},
        yaxis: {title: "Sample Values"},

    };

    Plotly.newPlot('bubble', trace2, layout2);

};


//this will be used to activate functions

function active(id) {
    //demo stuff, bar chart, and bubble chart
    demographics(id);
    barchart(id);
    bubblechart(id);
}