const fs = require('fs');
const { end, body, coincidence } = require("./utilitary-functions");
const brands = require("./brands.json");

function DELETE(req, res) {
  body({ req }, d => {
		let obj = cars[d.id] ? +cars[d.id] : null;
    if(obj) {   
      cars.splice(obj.id, 1);
      cars.forEach((c, i) => c.id = i);
      fs.writeFile('./cars.json', JSON.stringify(cars), (err) => {
        if (err) throw new Error(err);
      });
      end({ res, d: cars });
    } else end({res, e: 'not valid id'});    
  });
}

module.exports = DELETE;