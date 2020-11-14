//json path for data
const jsonPath = "static/data/samples.json";

//grab the JSON data
d3.json(jsonPath).then((data) => {
    jsonData = data;

    //console.log(data);

    //initiatlization
    init();
});
