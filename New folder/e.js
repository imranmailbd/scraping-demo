import React, { Component } from "react";
import rp from "request-promise";
import cheerio from "cheerio";
//import axios from "axios";

import "./App.css";




class App extends Component {
  state = { names: [], linkUrls: [] };




  componentDidMount() {

    
    // use the request-promise library to fetch the HTML from pokemon.org
    rp("https://www.marketbeat.com/stocks/directory/A/")
      .then(html => {
        let names = [];
        let $ = cheerio.load(html);

        // find what element ids, classes, or tags you want from opening console in the browser
        // cheerio library lets you select elements similar to querySelector
        //$("#monsters-list li span").each(function(i, element) {
        $("tr").each(function(i, element) {
          let name = $(this)
            .prepend()
            .html();
          names.push(name);

         // let linkUrl = $('a.no-underline'); 
          //let linkUrl = $('a.no-underline').text();
         // linkUrls.push(linkUrl);

          //this.sname = name;
          // let linkUrls = [];
          // let $ = cheerio.load(name);
          // $("td").each(function(i, element) {
          //   let linkUrl = $(this).prepend().html(); 
          //   //let linkUrl = $('a.no-underline').text();
          //   linkUrls.push(linkUrl);

          // });   

          //this.setState({ linkUrls });
          //console.log({ linkUrls });


          // Load the HTML code as a string, which returns a Cheerio instance
          //const $ = cheerio.load('<p id="example">This is an <strong>example</strong> paragraph</p>');
          // We can use the same API as jQuery to get the desired result
          //const txt = $('#example').text();          
          //linkUrls.push(txt);
          //this.setState({ linkUrls });
          //console.log(linkUrls);
      


        });


        this.setState({ names });
        console.log({ names });

        

      })
      .catch(function(err) {
        console.log("crawl failed");
      });



  




  }

  render() {
    return (
     

      <div>
        <ul>
          {this.state.names.map(name => {

            // var HTMLParser = require('fast-html-parser');
            // var test = name;
            // var root = HTMLParser.parse(test);
            // console.log(root.firstChild.nodeValue);

            var str = name;
            var res = str.split("</td>");
            //var result_data = res[2];
            //console.log(res[3]);
            
            
            //text = text.replace(/<(\/*)font[^>]*>/g, '<$1p>');
            var rawbuy=res[3];
            var rawsell=res[4]; 
            rawbuy = String(rawbuy); 
            rawsell = String(rawsell);

            // str = str.replace(/<font>/, "<p>");  
            // str = str.replace(/<\/font>/,"</p>"); 
            // console.log(str);

            if ((rawbuy===null) || (rawbuy==='')){
              console.log('none');
            } 

            if ((rawbuy!==null) || (rawbuy!=='')){
               const stripHtml = require("string-strip-html");
              console.log(stripHtml(rawbuy));  
            }

            if ((rawsell===null) || (rawsell==='')){
              console.log('none');
            } 

            if ((rawsell!==null) || (rawsell!=='')){
               const stripHtml = require("string-strip-html");
              console.log(stripHtml(rawsell));  
            }

           
            
      

           //  function removeTags(str) {
           //    var strd;
           //    if ((str===null) || (str===''))
           //    strd = 0;
           //    else
           //    strd = str.toString();
           //    return strd.replace( /(<([^>]+)>)/ig, '');
           // }
           // var rtag = removeTags(str);
           // console.log(rtag);

           

            const hpq = require('hpq');

            const document = hpq.parse( name, {
                src: hpq.attr( 'img', 'src' ),
                href: hpq.attr( 'a', 'href' ),
                company: hpq.query( '.ticker-area', hpq.text() ),
                
            } );
           

            console.log(document.src);
            console.log(document.href);
            console.log(document.company); 
     
    


            return <li key={name}>{name}</li>;  



          })}
        </ul>
      </div>
    );
  }
}

export default App;