var express = require('express')
var app = express()

app.use('/comment', express.static('./public'));
app.get('/', function (req, res) {
  res.send('Hello World')
})
app.get('/api/comments', function (req, res) {
  res.json([
    {"author": "Pete Hunt1", "text": "This is one comment",id:'1'},
    {"author": "Jordan Walke", "text": "This is *another* comment", "id":'2'}
  ]);
})
app.listen(3000);
