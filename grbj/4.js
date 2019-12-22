import React, { Component } from "react";
import rp from "request-promise";

import "./App.css";

class App extends Component {
  state = {};

  componentDidMount() {
    // use the request-promise library to fetch the HTML from pokemon.org
    rp("https://pokedex.org/")
      .then(html => console.log(html))
  }

  render() {
    return (
      <div>
        <p>hello</p>
      </div>
    );
  }
}

export default App;