const fs = require('fs');
const { end, body, coincidence, isPath } = require("./utilitary-functions");
const brands = require("./brands.json");
const cars = require("./cars.json");

function postBrand(req, res) {
	body({ req }, d => {
		let obj = {
			id: brands.length,
			name: d.name,
			description: d.description
		}
		if (coincidence({ prop: "name", array: brands, val: d.name })) {
			end({ res, s: false, e: 'name already registrer' });
		} else {
			brands.push(obj);
			fs.writeFile('./brands.json', JSON.stringify(brands), (err) => {
				if (err) throw new Error(err);
			});
			end({ res, d: brands });
		}
	})

}

function postCars(req, res) {
	body({ req }, d => {
		let date = new Date();
		let obj = {
			id: cars.length,
			name: d.name,
			brandId: coincidence({ prop: 'id', array: brands, val: +d.brandId }) ? +d.brandId : null,
			year: +d.year,
			color: d.color,
			description: d.description,
			date: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
		}
		console.log(obj, { prop: 'id', array: brands, val: d.brandId });
		if (obj.name && obj.brandId && obj.year && obj.color) {
			cars.push(obj);
			fs.writeFile('./cars.json', JSON.stringify(cars), (err) => {
				if (err) throw new Error(err);
			});
			end({ res, d: cars });
		} else {
			end({ res, s: false, e: 'name, brandId, year and color are required' });
		}

	})
}

function POST(req, res) {

	if (req.url === '/api/v1/brands') {
		postBrand(req, res);
	} else if (req.url === '/api/v1/cars') {
		postCars(req, res);
	} else {
		end({ res, s: false, e: 'End Point not valid', st: 500 });
	}


}


module.exports = POST;