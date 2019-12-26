import React, { Component } from "react";
import rp from "request-promise";
import cheerio from "cheerio";
import axios from 'axios';
import "./App.css";



class App extends Component {

  state = { scrapdata: [] };

  constructor(props) {
    super(props);

    const people = [];

    for (let i = 0; i < 2; i++) {
        people.push({
            name: 'Imran',
            phone: '353535353453',
            email: 'imranmailbd@gmail.com',
            job: 'programmer',
            company: 'trenza',
            age: '38',
            city: 'dhaka',
        });
        //name: chance.first(),
        //country: chance.country({ full: true })
    }
  

    this.state = { people };
}






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

  // const employee = {
  //   name: 'Imran',
  //   phone: '353535353453',
  //   email: 'imranmailbd@gmail.com',
  //   job: 'programmer',
  //   company: 'trenza',
  //   age: '38',
  //   city: 'dhaka'
  // };

  //console.log(employee);

 //  const people = [];
 //  //for (let i = 0; i < 2; i++) {
 //      people.push({
 //          name: 'Imran',
 //          phone: '353535353453',
 //          email: 'imranmailbd@gmail.com',
 //          job: 'programmer',
 //          company: 'trenza',
 //          age: '38',
 //          city: 'dhaka',
 //      });
 //      //name: chance.first(),
 //      //country: chance.country({ full: true })
 // // }
 // this.state = { people };

 //console.log(this.state.people);

  // axios.post('http://127.0.0.1:3005', this.state.people)
  //   .then(res => {
  //   //alert('POST');
  //   console.log(employee);
  //     const persons = res.data;
  //     this.setState({ persons });
  // })   


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


  render(e) {


   


    //let data = [{"name": 'Imran'}, {"phone": '353535353453'}, {"email": 'imranmailbd@gmail.com'},{"job": 'programmer'}, {"company": 'trenza'}, {"age": '38'},{"city": 'dhaka'},];
    // let data = [{"name": 'Imran',"phone": '353535353453',"email": 'imranmailbd@gmail.com',"job": 'programmer',"company": 'trenza',"age": '38',"city": 'dhaka'}];

    // const content2 = data.map((value, index) => {
    //     return (
    //       <div key={index}>
    //         {Object.values(value)[0]}{Object.values(value)[1]}
    //       </div>
    //     );
    // });
    // return (
    //   <div>{content2}</div>

      
    //     axios.post('http://127.0.0.1:3005', content2)
    //         .then(res => {
    //         //alert('POST');
    //         // console.log(employee);
    //           const persons = res.data;
    //           this.setState({ persons });
    //       }) 
      
    // )

    return (     

              <div>
                <ul>
                  {

                    //####################Scraping Start#################################    
                    this.state.scrapdata.map(scraprow => {


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
                      scrapStrObj.buy = 1; 
                    } 

                    if ((rawbuy!==null) || (rawbuy!=='')){
                        const stripHtml = require("string-strip-html");
                        //console.log(stripHtml(rawbuy));  
                        scrapStrObj.buy = stripHtml(rawbuy);                    
                    }

                    if ((rawsell===null) || (rawsell==='')){
                        //console.log('none');
                        scrapStrObj.sell = 1; 
                    } 

                    if ((rawsell!==null) || (rawsell!=='')){
                        const stripHtml = require("string-strip-html");
                        //console.log(stripHtml(rawsell));  
                        scrapStrObj.sell = stripHtml(rawsell);
                    } 


                    //})
                    //###################Scraping End#######################################


                    // const response = await axios.post(
                    //   'https://example.com',
                    //   { example: 'data' },
                    //   { headers: { 'Content-Type': 'application/json' } }
                    // )
                    // console.log(response.data) 


                    e.preventDefault();
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

                    axios.post('http://127.0.0.1:3005', employee)
                      .then(res => {
                      //alert('POST');
                      console.log(employee);
                        const persons = res.data;
                        this.setState({ persons });
                    })   


  //                   const content2 = data.map((value, index) => {
  //                       return (
  //                         <div key={index}>
  //                           {Object.values(value)[0]}{Object.values(value)[1]}
  //                         </div>
  //                       );
  //                   });
  //   //return <div>{content2}</div>;

  //   axios.post('http://127.0.0.1:3005', content2)
  //   .then(res => {
  //   //alert('POST');
  //   // console.log(employee);
  //     const persons = res.data;
  //     this.setState({ persons });
  // }) 




                    //###########################################

                    //return <li key={scraprow}><ul><li>{scrapStrObj.company}</li><li>{scrapStrObj.buy}</li><li>{scrapStrObj.sell}</li><li>{scrapStrObj.src}</li><li>{scrapStrObj.href}</li></ul></li>;  



                  })



                  //e.preventDefault();
                    // const employee = {
                    //   'name': 'Imran',
                    //   'phone': '353535353453',
                    //   'email': 'imranmailbd@gmail.com',
                    //   'job': 'programmer',
                    //   'company': 'trenza',
                    //   'age': '38',
                    //   'city': 'dhaka',
                    // }

                    //console.log(employee);

                   //  const people = [];
                   //  //for (let i = 0; i < 2; i++) {
                   //      people.push({
                   //          name: 'Imran',
                   //          phone: '353535353453',
                   //          email: 'imranmailbd@gmail.com',
                   //          job: 'programmer',
                   //          company: 'trenza',
                   //          age: '38',
                   //          city: 'dhaka',
                   //      });
                   //      //name: chance.first(),
                   //      //country: chance.country({ full: true })
                   // // }
                   // this.state = { people };

                   //console.log(this.state.people);

                    // axios.post('http://127.0.0.1:3005', this.state.people)
                    //   .then(res => {
                    //   //alert('POST');
                    //   console.log(employee);
                    //     const persons = res.data;
                    //     this.setState({ persons });
                    // })   

                    //console.log(people);




                }
                </ul>
              </div>
    );
  }
}

export default App;