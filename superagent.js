var superagent = require('superagent');

superagent.get('http://www.google.com', function(err, res) {
  console.log(res.status); // 200 OK
  console.log(res.text); // HTML for Google's home page
});


