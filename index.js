let url = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json';
req = new XMLHttpRequest();

let baseTemp;
let values = [];

/*used the open method to set the XMLHttpRequest. The first argument is the 'GET' method
as we are fetching info from an url (which is the second argument). The third argument
is a boolean wheter we want to run the function as asyncronous or not.*/
req.open('GET', url, true);
/*what to do with the data when we get it. In this line of code it is formated from a JSON
string into a javascript object.*/
req.onload =()=>{
    let data = JSON.parse(req.responseText);
    baseTemp = data['baseTemperature'];
    values = object['monthlyVariance']
}