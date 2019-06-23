const qs = require('querystring');

function end({ res, s = true, e = null, d = null, st = 200 }) {
	res.statusCode = st;
	res.end(JSON.stringify({
		success: s,
		error: e,
		data: d
	}));
}

function body({ req }, f) {
	var newData = '';
	req
		.on('data', chunk => newData += chunk)
		.on('end', () => {
			var d = qs.parse(newData);
			f(d);
		});
}

function coincidence({prop, array, val}) {
	let bool = false;
	for (let i = 0; i < array.length; i++) {
		if (array[i][prop] === val) {
			bool = true;
			break;
		}
	}
	return bool;
}

module.exports = { end, body, coincidence };

