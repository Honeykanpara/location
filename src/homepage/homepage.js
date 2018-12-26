import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import MapsComponent from '../mapsComponent/mapsComponent.js';
import Geocode from "react-geocode";
import NearbyComponent from '../nearbyComponent/nearbyComponent.js';

Geocode.setApiKey("AIzaSyBr9VoS8bsF3oVfNU9BQmo44M-oNascEIY");

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: "",
      longitude: "",
      loadMaps: false,
      address: ""
        }
    this.getLocation = this.getLocation.bind(this);
    this.handlePositionChange = this.handlePositionChange.bind(this);
  }
  handleChange = (e) => {
    this.setState({ latitude: e.latitude, longitude: e.longitude, loadMaps: true });
    this.getAddress(e.latitude, e.longitude);
  }
  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.handleChange(position.coords);
      });
    }
  }

  getAddress(lat, long) {
    Geocode.fromLatLng(lat, long).then(
      response => {
        this.setState({ address: response.results[0].formatted_address });
      },
      error => {
        console.error(error);
      }
    );
  }
  componentDidMount() {
    this.getLocation();
  }

  handlePositionChange(position) {
    this.setState({ latitude: position.lat, longitude: position.lng });
  }

  render() {
    return (
      <div className="App">
        <div className="header-component">Welcome</div>
        <div className="app-body">
          <div className="map-component">{this.state.loadMaps ? <MapsComponent latitude={this.state.latitude} longitude={this.state.longitude}></MapsComponent> : ""}</div>
        </div>
        <div className="location-text"> You are at: {this.state.address}</div>
        {this.state.loadMaps ? <NearbyComponent latitude={this.state.latitude} longitude={this.state.longitude} onSelectPosition={this.handlePositionChange}></NearbyComponent> : ""}
      </div>
    );
  }
}

export default HomePage;