import React, { Component } from "react";
import rp from "request-promise";
import cheerio from "cheerio";
import "./App.css";



class App extends Component {

  state = { scrapdata: [] };

  componentDidMount() {    
    // use the request-promise library to fetch the HTML from pokemon.org
    rp("https://www.marketbeat.com/stocks/directory/A/")
      .then(html => {
        let scrapdata = [];
        let $ = cheerio.load(html);

        $("tr").each(function(i, element) {
          let scraprow = $(this)
            .prepend()
            .html();
          scrapdata.push(scraprow);

        });

        this.setState({ scrapdata });
        console.log({ scrapdata });        

      })
      .catch(function(err) {
        console.log("crawl failed");
      });
  }


  render() {
    
    return (     

              <div>
                <ul>
                  {this.state.scrapdata.map(scraprow => {


                    var scrapStrObj = {};
                                       
                    //######## DOM Parse Machanism ########
                    const hpq = require('hpq');
                    const document = hpq.parse( scraprow, {
                        src: hpq.attr( 'img', 'src' ),
                        href: hpq.attr( 'a', 'href' ),
                        company: hpq.query( '.ticker-area', hpq.text() ),
                        
                    } );

                    scrapStrObj.src = document.src;
                    scrapStrObj.href = document.href;
                    scrapStrObj.company = document.company;


                    //console.log(document.src);
                    //console.log(document.href);
                    //console.log(document.company); 
                    //########################################

                    //####### Dirty Hand Machanism #####
                    var str = scraprow;
                    var res = str.split("</td>");                   
                    var rawbuy=res[3];
                    var rawsell=res[4]; 
                    rawbuy = String(rawbuy); 
                    rawsell = String(rawsell);                   

                    if ((rawbuy===null) || (rawbuy==='')){
                      //console.log('none');
                      scrapStrObj.buy = null; 
                    } 

                    if ((rawbuy!==null) || (rawbuy!=='')){
                        const stripHtml = require("string-strip-html");
                        //console.log(stripHtml(rawbuy));  
                        scrapStrObj.buy = stripHtml(rawbuy);                    
                    }

                    if ((rawsell===null) || (rawsell==='')){
                        //console.log('none');
                        scrapStrObj.sell = null; 
                    } 

                    if ((rawsell!==null) || (rawsell!=='')){
                        const stripHtml = require("string-strip-html");
                        //console.log(stripHtml(rawsell));  
                        scrapStrObj.sell = stripHtml(rawsell);
                    }  


                    //########################################### 


            


                    return <li key={scraprow}><ul><li>{scrapStrObj.company}</li><li>{scrapStrObj.buy}</li><li>{scrapStrObj.sell}</li><li>{scrapStrObj.src}</li><li>{scrapStrObj.href}</li></ul></li>;  



                  })}
                </ul>
              </div>
    );
  }
}

export default App;