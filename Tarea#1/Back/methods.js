const fs = require('fs');
const { end, body, coincidence } = require("./utilitary-functions");
const brands = require("./brands.json");

function GET(req, res) {
	if (req.url === '/api/v1/cars') {
		end({ d: brands });
	} else {
		end({ res, s: false, e: 'End Point not valid', st: 500 });
	}
}



function POST(req, res) {
	if (req.url === '/api/v1/brands') {
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
				console.log(brands);
				fs.writeFile('./brands.json', JSON.stringify(brands), (err) => {
					if (err) throw new Error(err);
				});
				end({ res, d: brands });
			}
		})
	} else {
		end({ res, s: false, e: 'End Point not valid', st: 500 });
	}
}

function PUT(req, res) {

}

function DELETE(req, res) {

}

module.exports = {
	GET,
	POST,
	PUT,
	DELETE
};
