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

module.exports = GET;