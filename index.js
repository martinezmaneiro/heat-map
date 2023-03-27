let url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json';
req = new XMLHttpRequest();

let baseTemp;
let values = [];

let width = 1200;
let height = 600;
let padding = 60;

let minYear;
let maxYear;

let xScale;
let yScale;

/*the html element svg selector. Then variables defined above were used to give width and height attributes*/
let svg = d3.select('#canvas');
let drawCanvas =()=> {
    svg.attr('width', width);
    svg.attr('height', height);
};

let generateScales =()=> {
    /*setters for min and max year. This values will be used to set the domain of the x scale*/
    minYear = d3.min(values, (item) =>{
        return item.year
    })
    maxYear = d3.max(values, (item) =>{
        return item.year
    })

    /*graph x and y scales*/
    xScale = d3.scaleLinear()
                .domain([minYear, maxYear])
                .range([padding, width - padding]);

    yScale = d3.scaleTime()
                .domain([new Date(0, 0, 0, 0, 0, 0, 0), new Date(0, 12, 0, 0, 0, 0, 0)])
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
        .attr('class', 'cell')
        /*rect fill color conditional styling*/
        .attr('fill', (item) => {
            variance = item.variance;
            if (variance <= -1){
                return 'SteelBlue'
            }else if(variance <= 0){
                return 'LightSteelBlue'
            }else if(variance <= 1){
                return 'Orange'
            }else{
                return 'Crimson'}
        })
        /*attributes added for user story 7*/
        .attr('data-year', item => {return item.year})
        /*the user story does not pass the test if we do not substract 1 (for those items with a value of 12)*/
        .attr('data-month', item => {return item.month -1})
        /*in this case we have to get the temperature from baseTemp and variance*/
        .attr('data-temp', item => {
            return baseTemp + item.variance
        })
        .attr('height', (height - (2 * padding)) / 12)
        /*converting the month value into a JS Date object to give it an appropiate (ranged) y value */
        .attr('y', item => {
            return yScale(new Date(0, item.month -1, 0, 0, 0, 0, 0))})
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