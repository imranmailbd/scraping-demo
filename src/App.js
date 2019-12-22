import React, { Component } from "react";
import rp from "request-promise";
import cheerio from "cheerio";

import "./App.css";



class App extends Component {
  state = { names: [] };

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
      console.log(root.firstChild.structure);

            return <li key={name}>{name}</li>;  



          })}
        </ul>
      </div>
    );
  }
}

export default App;