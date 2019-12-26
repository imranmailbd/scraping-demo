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

             var HTMLParser = require('fast-html-parser');
             var test = name;
             var root = HTMLParser.parse(test);
             console.log(root.firstChild.nodeValue);
             //console.log(root.querySelector('.ticker-area'));
            // console.log(root.querySelectorAll('td').Text);
            //console.log(root.querySelector("find('td')[0]"));
            
//             var htmlStrObj = {};
// htmlStrObj.container = name;
// console.log(htmlStrObj);

var str = name;
var res = str.split("<td>");
console.log(res[2]);
            

            // var cheerio = require('cheerio'),
            // $ = cheerio.load(name);
            // console.log($('a.no-underline').text());

            const hpq = require('hpq');
            //const document = parse5.parse(name);

            //console.log(document.childNodes[1].tagName); //> 'html'
            // const document = hpq.parse( '<figure><img src="img.png" alt="Image"><figcaption>An Image</figcaption></figure>', {
            //     src: hpq.attr( 'img', 'src' ),
            //     alt: hpq.attr( 'img', 'alt' ),
            //     caption: hpq.text( 'figcaption' )
            // } );

            // hpq.parse( '<blockquote><p>...</p><p>...</p><cite>Andrew</cite></blockquote>', {
            //   text: hpq.query( 'p', hpq.text() ),
            //   cite: hpq.text( 'cite' )
            // } );

//             <td>
//   <a class="no-underline" href="/stocks/TSE/AW-UN/">
//     <div class="company-thumbnail">
//       <img src="https://www.marketbeat.com/logos/thumbnail/a-and-w-revenue-royalties-income-fund-logo.jpg" alt="A and W Revenue Royalties Income Fund logo">
//     </div>
//     <div class="ticker-area">AW.UN</div><div class="title-area">A and W Revenue Royalties Income Fund</div>
//   </a>
// </td>
// <td>Consumer Cyclical</td>
// <td>Restaurants</td><td data-sort-value="3">Buy</td>
// <td data-sort-value="0">N/A</td>

            //console.log(name.childNodes[1].tagName);

            //const mycel = myrow.getElementsByTagName("td")[1];
            
             //const urlSpan = root.find('td')[0];
             //console.log(urlSpan);
             // console.log(name.closest('tr').find('td:nth-child(2)').text());

            const document = hpq.parse( name, {
                src: hpq.attr( 'img', 'src' ),
                href: hpq.attr( 'a', 'href' ),
                company: hpq.query( '.ticker-area', hpq.text() ),
                
            } );
            //td: hpq.attr( 'td', 'data-sort-value' )


            // attr( selector: ?string, name: string ): Function'
            // prop( selector: ?string, name: string ): Function
            // html( selector: ?string ): Function
            // text( selector: ?string ): Function
            // text: hpq.query( 'p', hpq.text() ),
            // query( selector: string, matchers: Object | Function )

            // items: query(selector:"tr.athing") {
            // rank: text(selector:"td span.rank")
            // title: text(selector:"td.title a")

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