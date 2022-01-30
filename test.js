const fs = require('fs');
const dir = './public/images/artic/1.jpg';

fs.stat(dir, (err, stats) => {
  console.log('stats: ',stats);
})