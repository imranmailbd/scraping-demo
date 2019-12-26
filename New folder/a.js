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


                    // const response = await axios.post(
                    //   'https://example.com',
                    //   { example: 'data' },
                    //   { headers: { 'Content-Type': 'application/json' } }
                    // )
                    // console.log(response.data) 


                    //e.preventDefault();
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


                    //###########################################

                    //return <li key={scraprow}><ul><li>{scrapStrObj.company}</li><li>{scrapStrObj.buy}</li><li>{scrapStrObj.sell}</li><li>{scrapStrObj.src}</li><li>{scrapStrObj.href}</li></ul></li>;  



                  })



                  var testStrObj = {};
                  
                  testStrObj.src= 'imran'; //this.state.name,
                  testStrObj.href= 'test.com';  //this.state.phone,
                  testStrObj.company= 'imranmailbd@gmail.com';  //this.state.email,
                  testStrObj.buy= 'dsfdf';  //this.state.job,
                  testStrObj.sell= 'yurtyutyu';  //this.state.company,
                   

                  //console.log(employee);