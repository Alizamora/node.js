const data = require('./data.json');
const fs = require('fs');
const qs = require('querystring');

function GET(req, res) {

}

function POST(req, res) {
	var newData = '';
	req
	.on('data', chunk => newData += chunk)
	.on('end', () => {
		var d = qs.parse(newData);
		data.push(d);
		fs.writeFile('./data.json', JSON.stringify(data), (err) => {
			if (err) throw err;
		});
		res.end(JSON.stringify({
			success: true,
			error: null,
			data: d
		}));
	});
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
