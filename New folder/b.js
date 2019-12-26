 var testStrObj = {};
                  
                  testStrObj.src= 'imran'; //this.state.name,
                  testStrObj.href= 'test.com';  //this.state.phone,
                  testStrObj.company= 'imranmailbd@gmail.com';  //this.state.email,
                  testStrObj.buy= 'dsfdf';  //this.state.job,
                  testStrObj.sell= 'yurtyutyu';  //this.state.company,
                   

                    //console.log(employee);

                    //e.preventDefault();
                    const employee = {
                      name: testStrObj.src, //this.state.name,
                      phone: testStrObj.href,  //this.state.phone,
                      email: testStrObj.company,  //this.state.email,
                      job: testStrObj.buy,  //this.state.job,
                      company: testStrObj.sell,  //this.state.company,
                      age: '',  //this.state.age,
                      city: '',  //this.state.city,
                    }

                    axios.post('http://127.0.0.1:3005', employee)
                      .then(res => {
                      //alert('POST');
                      console.log(employee);
                        const persons = res.data;
                        this.setState({ persons });
                    })    