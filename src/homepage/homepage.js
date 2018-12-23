import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import MapsComponent from'../mapsComponent/mapsComponent.js'

class HomePage extends Component {
    constructor(){
        super();
        this.state = {
            latitude: "",
            longitude: "",
            loadMaps: false
        }
        this.getLocation=this.getLocation.bind(this);
    }
    handleChange = (e) =>{ 
        this.setState({latitude: e.latitude, longitude: e.longitude});
      }
  getLocation(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) =>{
        this.handleChange(position.coords);
        this.setState({loadMaps: true});
      });
    }
  }

  

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div>Get your location</div><button onClick= {this.getLocation} >Get Location</button>
          <div>
         testtt {this.state.latitude} {this.state.longitude}
          </div>
          {this.state.loadMaps ? <MapsComponent latitude={this.state.latitude} longitude={this.state.longitude}></MapsComponent> : ""}
        </header>
      </div>
    );
  }
}

export default HomePage;