  var cheerio = require('cheerio');

             $ = cheerio.load(name);
var data = [];
    $('tr td').each(function(i, td){

        var children = $(this).children();
        var itemNum = children.eq(0);
        var itemName = children.eq(1);
      });