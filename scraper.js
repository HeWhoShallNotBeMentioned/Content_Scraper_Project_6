const fs = require('fs');
const Xray = require('x-ray');
let x = Xray();
let shirtsObj = {};


fs.openSync('data.js','w');

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
  for (let prop in shirtsDataObj) {
    console.log('shirtsDataObj.' + prop, '=', shirtsDataObj[prop]);
  }
});
