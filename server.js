const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

const Pusher = require('pusher');

const pusher = new Pusher({
  appId: '1120190',
  key: '5aaba2f508844b3273fb',
  secret: 'f86818913cd31f3c73e5',
  cluster: 'us3',
  encrypted: true
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/comment', function(req, res){
  console.log(req.body);
  var newComment = {
    name: req.body.name,
    email: req.body.email,
    comment: req.body.comment
  }
  pusher.trigger('flash-comments', 'new_comment', newComment);
  res.json({ created: true });
});


// Error Handler for 404 Pages
app.use(function(req, res, next) {
    var error404 = new Error('Route Not Found');
    error404.status = 404;
    next(error404);
});

module.exports = app;


app.listen(3000, function(){
  console.log('Example app listening on port 3000!')
});