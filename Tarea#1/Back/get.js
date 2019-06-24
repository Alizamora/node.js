const fs = require('fs');
const { end, body, coincidence, isPath } = require("./utilitary-functions");
const brands = require("./brands.json");
const cars = require("./cars.json");

function CSV(array){
	let h = Object.keys(array[0]).join(',')+ "\n";
	let b = "";
	array.forEach( o => {
		b += Object.keys(o).map(k => o[k]).join(',')+ "\n";
	});
	h += b;
	return h;
}


function GET(req, res) {
	if (req.url === '/api/v1/cars/report') {
		console.log(CSV(cars));
		res.end(CSV(cars));
	}else if(isPath(req.url, '/api/v1/cars')){
		res.end('Holi');
	}else {
		end({ res, s: false, e: 'End Point not valid', st: 500 });
	}
}

module.exports = GET;