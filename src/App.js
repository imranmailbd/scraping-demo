import React, { Component } from "react";
import rp from "request-promise";
import cheerio from "cheerio";
import axios from 'axios';
import "./App.css";



class App extends Component {

  state = { scrapdata: [], data: []};

  

  componentDidMount() {    
    // use the request-promise library to fetch the HTML from pokemon.org
    rp("https://www.marketbeat.com/stocks/directory/A/")
    .then(html => {
        let scrapdata = [];
        let data = [];
        let $ = cheerio.load(html);

        $("tr").each(function(i, element) {
          let scraprow = $(this)
            .prepend()
            .html();
          scrapdata.push(scraprow);

        });

        this.setState({ scrapdata });
        //console.log({ scrapdata });   


        //############New##########
        scrapdata.map(scraprow => {

          var scrapStrObj = {};
                             
          //######## DOM Parse Machanism ########
          const hpq = require('hpq');
          const document = hpq.parse( scraprow, {
              src: hpq.attr( 'img', 'src' ),
              href: hpq.attr( 'a', 'href' ),
              company_name_text: hpq.query( '.ticker-area', hpq.text() ),
              title: hpq.query( '.title-area', hpq.text() ),

          } );

          scrapStrObj.src = document.src;
          scrapStrObj.href = document.href;
          scrapStrObj.company_name_text = document.company_name_text;
          scrapStrObj.title = document.title;


          var str2 = String(scrapStrObj.href);
          var res2 = str2.split("/");  

          //console.log(res2);                 
          var market_name=res2[2];
          var company_name=res2[3]; 
          // market_name = String(market_name); 
          // company_name = String(company_name);  

          scrapStrObj.market_name = market_name;                 
          scrapStrObj.company_name = company_name;                 

          // if ((market_name===null) || (market_name==='')){
          //   //console.log('none');
          //   scrapStrObj.market_name = null; 
          // } 

          // if ((market_name!==null) || (market_name!=='')){
          //     const stripHtml = require("string-strip-html");
          //     //console.log(stripHtml(rawbuy));  
          //     scrapStrObj.market_name = stripHtml(market_name);                    
          // }

          // if ((company_name===null) || (company_name==='')){
          //     //console.log('none');
          //     scrapStrObj.company_name = null; 
          // } 

          // if ((company_name!==null) || (company_name!=='')){
          //     const stripHtml = require("string-strip-html");
          //     //console.log(stripHtml(rawsell));  
          //     scrapStrObj.company_name = stripHtml(company_name);
          // } 




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
          //##############EndNew#################


          console.log(scrapStrObj.src);
          console.log(scrapStrObj.href);
          console.log(scrapStrObj.company_name_text);
          console.log(scrapStrObj.title);
          console.log(scrapStrObj.market_name);
          console.log(scrapStrObj.company_name);
          console.log(scrapStrObj.buy);
          console.log(scrapStrObj.sell);


          const scraped_data = {
            market_name: scrapStrObj.market_name, 
            company_name: scrapStrObj.company_name, 
            company_name_text: scrapStrObj.company_name_text, 
            href: scrapStrObj.href, 
            title: scrapStrObj.title, 
            rating: scrapStrObj.buy, 
            pricetarget: scrapStrObj.sell, 
            created_at: '', 
            updated_at: ''
          }
          //console.log(employee);
          data.push(scraped_data);

           return (
          <div>
            test
          </div>);

    });


    
    this.setState({ data });


    })
    .catch(function(err) {
      console.log("crawl failed");
    });


  }




  render(e) {

 

 return (     

              <div>
                <ul>
                  {


                    this.state.data.map(scraprow => {

                     

                      axios.post('http://127.0.0.1:3005', scraprow)
                        .then(res => {
                        //alert('POST');
                        //console.log(scraprow);
                          const persons = res.data;
                          this.setState({ persons });
                      })    
                     

                   })


                }


                </ul>
              </div>
    );
    

  }
}

export default App;