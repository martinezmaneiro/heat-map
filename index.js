let url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json';
req = new XMLHttpRequest();

let baseTemp;
let values = [];

let width = 1200;
let height = 600;
let padding = 600;

/*the html element svg selector. Then variables defined above were used to give width and height attributes*/
let canvas = d3.select('#canvas');
let drawCanvas =()=> {
    canvas.attr('width', width);
    canvas.attr('height', height);
};

/*used the open method to set the XMLHttpRequest. The first argument is the 'GET' method
as we are fetching info from an url (which is the second argument). The third argument
is a boolean wheter we want to run the function as asyncronous or not.*/
req.open('GET', url, true);
/*what to do with the data when we get it. First it is formated from a JSON string into a
javascript object. Then we assing data values to the variables baseTemp and values*/
req.onload =()=>{
    let data = JSON.parse(req.responseText);
    baseTemp = data['baseTemperature'];
    values = data['monthlyVariance'];
    drawCanvas()
}
/*this method sends the request*/
req.send();