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
          {"name": "description", "content": "About My Location is a basic app which detects your current address and displays near by places on map. Get to know about your location and see important nearby places on map.Happy hunting !!!"},
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
