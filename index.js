let url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json';
req = new XMLHttpRequest();

let baseTemp;
let values = [];

let width = 1200;
let height = 600;
let padding = 60;

let xScale;
let yScale;

/*the html element svg selector. Then variables defined above were used to give width and height attributes*/
let svg = d3.select('#canvas');
let drawCanvas =()=> {
    svg.attr('width', width);
    svg.attr('height', height);
};

let generateScales =()=> {
    /*graph x and y scales*/
    xScale = d3.scaleLinear()
                .range([padding, width - padding]);

    yScale = d3.scaleTime()
                .range([padding, height - padding]);
};
/*x and y axes drawing & positioning*/
let drawAxes =()=> {
    let xAxis = d3.axisBottom(xScale);
    let yAxis = d3.axisLeft(yScale);

    svg.append('g')
            .call(xAxis)
            .attr('id', 'x-axis')
            .attr('transform', 'translate(0,' + (height - padding) +')');

    svg.append('g')
        .call(yAxis)
        .attr('id', 'y-axis')
        .attr('transform', 'translate(' + padding +', 0)');
};

/*when called, this function will draw a cell for every entry value we got from the fetch*/
let drawCells =()=> {
    svg.selectAll('rect')
        .data(values)
        .enter()
        .append('rect')
        .attr('class', 'cell');
}

/*used the open method to set the XMLHttpRequest. The first argument is the 'GET' method
as we are fetching info from an url (which is the second argument). The third argument
is a boolean wheter we want to run the function as asyncronous or not.*/
req.open('GET', url, true);
/*what to do with the data when we get it. First it is formated from a JSON string into a
javascript object. Then we assing data values to the variables baseTemp and values*/
req.onload =()=>{
    let data = JSON.parse(req.responseText);
    baseTemp = data.baseTemperature;
    values = data.monthlyVariance;
    drawCanvas();
    generateScales();
    drawAxes();
    drawCells();
}
/*this method sends the request*/
req.send();