const fs = require('fs');
const { end, body, coincidence } = require("./utilitary-functions");
const brands = require("./brands.json");

function PUT(req, res) {
	body({ req }, d => {
		let date = new Date();
		let obj = cars[d.id] ? cars[d.id] : null;
		if (obj) {
			obj.name = d.name;
			obj.brandId = coincidence({ prop: 'id', array: brands, val: +d.brandId }) ? +d.brandId : null;
			obj.year = +d.year;
			obj.color = d.color;
			obj.description = d.description;
			obj.date = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;

			if (obj.name && obj.brandId && obj.year && obj.color) {
				fs.writeFile('./cars.json', JSON.stringify(cars), (err) => {
					if (err) throw new Error(err);
				});
				end({ res, d: cars });
			} else {
				end({ res, s: false, e: 'name, brandId, year and color are required' });
			}
		} else end({ res, e: 'not valid id' });
	});
}

module.exports = PUT;


