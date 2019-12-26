var http = require("http");
 var express = require('express');
 var cors = require('cors')
 var app = express();
 var mysql      = require('mysql');
 var bodyParser = require('body-parser');

 app.use(cors())



 var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'test1234',
  database : 'myapp'
});




connection.connect(function(err) {
  if (err) throw err
  console.log('You are now connected with mysql database...')
})
  
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

var server = app.listen(3005, "127.0.0.1", function () {
  var host = server.address().address
  var port = server.address().port 
  console.log("Example app listening at http://%s:%s", host, port)
});

//route for insert data
app.post('/',(req, res) => {
	console.log(req);
  let data = {market_name: req.body.market_name, company_name: req.body.company_name, company_name_text: req.body.company_name_text, href: req.body.href, title: req.body.title, rating: req.body.rating, pricetarget: req.body.pricetarget, created_at: req.body.created_at, updated_at: req.body.updated_at};
  let sql = "INSERT INTO scraped_data SET ?";
  let query = connection.query(sql, data,(err, results) => {
    if(err) throw err;
    res.redirect('/');
  });
});



