const fs = require('fs');
const Xray = require('x-ray');
var json2csv = require('json2csv');
let x = Xray();
let timeStamp = new Date();



let fields = ['Title', 'Price', 'ImageURL', 'URL', 'Time'];

if (!fs.existsSync('data/')) {
  fs.mkdirSync('data/');
}

x('http://www.shirts4mike.com/shirts.php', {
  links: x('ul.products li', [{
    href: 'a@href',
    shirtData: x('a@href', {
      title: '.shirt-picture span img@alt',
      price: '.shirt-details .price',
      imgURL: 'img@src',
    })
  }])
})(function(err, shirtsDataObj) {
  let shirtsArray = [];
  // for (let prop in shirtsDataObj) {
  //   console.log('shirtsDataObj.' + prop, '=', shirtsDataObj[prop]);
  // }

  for(let z = 0; z < shirtsDataObj.links.length; z++) {
    let shirtObj = {
      "title": shirtsDataObj.links[z].shirtData.title,
      "price": shirtsDataObj.links[z].shirtData.price,
      "imgURL": shirtsDataObj.links[z].shirtData.imgURL,
      "url": shirtsDataObj.links[z].href,
      "time": timeStamp
    };
    shirtsArray.push(shirtObj);
  }
  //let result = json2csv({ data: shirtsDataObj, fields: fields });
  console.log(shirtsArray);

});

////code for getting day month and year for file name. Perhaps put in a function?
// var dateObj = new Date();
// var month = dateObj.getUTCMonth() + 1; //months from 1-12
// var day = dateObj.getUTCDate();
// var year = dateObj.getUTCFullYear();
//
// newdate = year + "/" + month + "/" + day;
