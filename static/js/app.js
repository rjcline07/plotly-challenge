//json path for data
const jsonPath = "static/data/samples.json";

//grab data
d3.json(jsonPath).then((data) => {
    jsonData = data;

    //console.log(data);

    //initiatlization
    init();
});
