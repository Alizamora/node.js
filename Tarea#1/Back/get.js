const fs = require('fs');
const { end, body, coincidence, isPath } = require("./utilitary-functions");
const brands = require("./brands.json");
const cars = require("./cars.json");
const items = 10;

function query(req, myVar) {
	let reg = new RegExp(`\\??&?(${myVar})=(.+)&?`, 'g')
		.exec(req.url.split('%20').join(' '));
	return reg ? reg[2].split('&')[0] : reg;
}

function sort(prop, array) {
	function weightStr(str) {
		return (str + '').split('')
			.map((l, i) => l.charCodeAt() / (i + 1) ** (i + 1))
			.reduce((a, b) => a + b);
	}
	return array[0][prop] ?
		[].concat(array).sort((a, b) =>
			weightStr(a[prop]) - weightStr(b[prop])) : array;
}

function CSV(array) {
	let h = Object.keys(array[0]).join(',') + "\n";
	let b = "";
	array.forEach(o => {
		b += Object.keys(o).map(k => o[k]).join(',') + "\n";
	});
	h += b;
	return h;
}

function GET(req, res) {
	if (req.url === '/api/v1/cars/report') {
		console.log(CSV(cars));
		res.end(CSV(cars));
	} else if (isPath(req.url, '/api/v1/cars')) {
		const page = +query(req, 'page');
		const sortBy = query(req, 'sortBy');
		const search = query(req, 'search');
		console.log(search);
		let array = [].concat(brands)
			.splice(
				Math.abs(page ? page - 1 : 0) * items, items);
		if (search) {
			let searchArray = [];
			array.forEach(o => {
				for (let key in o) {
					o[key] = (o[key] + '').toLowerCase();
					if (o[key].indexOf(search.toLowerCase()) > -1) return searchArray.push(o);
				}
			});
			array = searchArray;
		}
		if (sortBy) {
			array = sort(sortBy ? sortBy : 'id', cars);
		}
		end({ res, d: array });
	} else {
		end({ res, s: false, e: 'End Point not valid', st: 500 });
	}
}

module.exports = GET;