import React, { Component } from 'react';
import './App.css';
import HomePage from'./homepage/homepage.js';
import {Helmet} from "react-helmet";

class App extends Component {
  
  render() {
    return (
      <div>
        <Helmet title="About My Location"
        meta={[
          {"name": "description", "content": "About my location helps you to find nearby places and their adress. It is very easy to use and its awesome."},
          {"name": "google-site-verification", "content": "rh7wBQPuRc8UHq4jNy5RLd-8i1GCRryFTq6XvmfcUf0"}
         ]}/>
         <meta name="google-site-verification" content="rh7wBQPuRc8UHq4jNy5RLd-8i1GCRryFTq6XvmfcUf0" />
        {/* <meta charSet="utf-8" />
        <title>About My Location</title>
        <link rel="canonical" href="http://mysite.com/example" /> */}
        <HomePage></HomePage>
      </div>
    );
  }
}

export default App;
