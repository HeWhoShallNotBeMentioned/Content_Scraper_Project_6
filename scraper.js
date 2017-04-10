const fs = require('fs');
const Xray = require('x-ray');
let x = Xray();


fs.openSync('data.js','w');

x('http://www.shirts4mike.com/shirts.php', {
  links: x('ul.products li', [{
    href: 'a@href',
    shirtData: x('ul.products li a@href', {
      title: '.shirt-details h1',
      price: '.shirt-details .price',
      imgURL: 'img@src',
    })
  }])
})(function(err, obj) {
console.log(obj);
});

// Not working either from github fix
// x('http://www.imdb.com/', {
// title: ['title'],
// links: x('.rhs-body .rhs-row', [{
// text: 'a',
// href: 'a@href',
// next_page: x('a@href', {
// title: 'title',
// heading: 'h1'
// })
// }])
// })(function(err, obj) {
// console.log(obj);
// });
