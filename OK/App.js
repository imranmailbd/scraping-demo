import React, { Component } from "react";
import rp from "request-promise";
import cheerio from "cheerio";
import axios from 'axios';
import "./App.css";



class App extends Component {

  state = { scrapdata: [], data: []};

  // constructor(props) {
  //         super(props)
  //          this.state = {
  //           persons: [],
  //           users: []
  //         }
  //         this.handleIdChange = this.handleIdChange.bind(this);
  //         this.handleNameChange = this.handleNameChange.bind(this);
  //         this.handleEmailChange = this.handleEmailChange.bind(this);
  //         this.handlePhoneChange = this.handlePhoneChange.bind(this);
  //         this.handleJobChange = this.handleJobChange.bind(this);
  //         this.handleCompanyChange = this.handleCompanyChange.bind(this);
  //         this.handleAgeChange = this.handleAgeChange.bind(this);
  //         this.handleCityChange = this.handleCityChange.bind(this);
  //         this.onSubmit = this.onSubmit.bind(this);
         
  // }

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
        console.log({ scrapdata });   


        //############New##########
        scrapdata.map(scraprow => {

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

          //data[] = {"name": 'Imran',"phone": '353535353453',"email": 'imranmailbd@gmail.com',"job": 'programmer',"company": 'trenza',"age": '38',"city": 'dhaka'};
          // data.push({"name": 'Imran',"phone": '353535353453',"email": 'imranmailbd@gmail.com',"job": 'programmer',"company": 'trenza',"age": '38',"city": 'dhaka'});
          const employee = {
            name: scrapStrObj.src, //this.state.name,
            phone: scrapStrObj.href,  //this.state.phone,
            email: scrapStrObj.company,  //this.state.email,
            job: scrapStrObj.buy,  //this.state.job,
            company: scrapStrObj.sell,  //this.state.company,
            age: '',  //this.state.age,
            city: '',  //this.state.city,
          }
          //console.log(employee);
          data.push(employee);

           return (
          <div>
            test
          </div>);

    });



    //data = [{"name": 'Imran',"phone": '353535353453',"email": 'imranmailbd@gmail.com',"job": 'programmer',"company": 'trenza',"age": '38',"city": 'dhaka'}];
    this.setState({ data });


    })
    .catch(function(err) {
      console.log("crawl failed");
    });


  }




  render(e) {

 
//this.setState({ data });
//     const content2 = data.map((value, index) => {
//         return (
//           <div key={index}>
//             {Object.values(value)[0]}{Object.values(value)[1]}
//           </div>
//         );
//     });
//     return (
//       <div>{content2}</div>
// )

// const employee = data.map((value, index) => {
//                     return (
//                         <div key={index}>
//                           {Object.values(value)[0]}{Object.values(value)[1]}
//                         </div>
//                       );
//                   });

 return (     

              <div>
                <ul>
                  {


                    this.state.data.map(scraprow => {

                      //alert(scraprow.name);

                      axios.post('http://127.0.0.1:3005', scraprow)
                        .then(res => {
                        //alert('POST');
                        console.log(scraprow);
                          const persons = res.data;
                          this.setState({ persons });
                      })    
                     

                   })

                  //e.preventDefault();
                  
                  //   name: 'imran', //this.state.name,
                  //   phone: '34545345',  //this.state.phone,
                  //   email: 'imranmailbd@gmail.com',  //this.state.email,
                  //   job: '545345',  //this.state.job,
                  //   company: 'hgfhghgh',  //this.state.company,
                  //   age: '',  //this.state.age,
                  //   city: '',  //this.state.city,
                  // };

                  
                  




                }

                </ul>
              </div>
    );
    

  }
}

export default App;