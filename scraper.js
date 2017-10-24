
const http = require('http');
const fs = require('fs');
const Xray = require('x-ray');
const site = 'http://www.shirts4mike.com/shirts.php';
let json2csv = require('json2csv');
let x = Xray();
let timeStamp = new Date();
let fields = ['title', 'price', 'imgURL', 'url', 'time'];
let newdate;
//creates time for name of daily data output file
function getTime() {
  var dateObj = new Date();
  var month = dateObj.getMonth() + 1; //months from 1-12
  var day = dateObj.getDate();
  var year = dateObj.getFullYear();
  newdate = year + "_" + month + "_" + day;
  return newdate;
}

//checks if data folder exists. If not, creates the folder
if (!fs.existsSync('data/')) {
  fs.mkdirSync('data/');
}

//x-ray data scraper
x(site, {
  links: x('ul.products li', [{
    href: 'a@href',
    shirtData: x('a@href', {
      title: '.shirt-picture span img@alt',
      price: '.shirt-details .price',
      imgURL: 'img@src',
    })
  }])
})
//function that processes object from the screen scraper into csv data saved in daily file
(function(err, shirtsDataObj) {
  //error message handling if there is a problem with receiving data from the scraper
  if (err) {
    console.log("error object ". err);
    const statusCodeError = new Error (`There was an error getting the site ${site}.
		    	`); // (${http.STATUS_CODES[err.code]})
    console.log(statusCodeError);


    fs.appendFileSync('scraper-error.log', '\n['+ timeStamp + "] " + statusCodeError + " " + err.message);
  }
  let shirtsArray = [];
  // for (let prop in shirtsDataObj) {
  //   console.log('shirtsDataObj.' + prop, '=', shirtsDataObj[prop]);
  // }
  //pulls out the data in object
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
  //Converts data from JSON to csv format
  let result = json2csv({ data: shirtsArray, fields: fields });
  //writes the data to the daily file.
  fs.writeFileSync('data/' + getTime() +'.csv', result);
});
