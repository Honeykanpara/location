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
      address: "",
      loadNearby: false
    }
    this.getLocation = this.getLocation.bind(this);
    this.handlePositionChange = this.handlePositionChange.bind(this);
    this.resultData = [];
  }
  handleChange = (e) => {
    this.setState({ latitude: e.latitude, longitude: e.longitude, loadMaps: true });
    this.getAddress(e.latitude, e.longitude);
    this.placeSearch(e.latitude, e.longitude, 10000);
  }
  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.handleChange(position.coords);
      });
    }
  }

  placeSearch(latitude, longitude, radius) {

    fetch('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + latitude + ',' + longitude + '&radius=' + radius + '&types=hospital&key=AIzaSyBr9VoS8bsF3oVfNU9BQmo44M-oNascEIY')
      .then(res => res.json())
      .then(
        (result) => {
          console.log(result);
          result.results.map((res) => {
            this.resultData.push(res);
            console.log("state");
            this.setState({ loadNearby: true });
          }
          );
        },
        (error) => {
        }
      )
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
    console.log(position);
    this.setState({ latitude: position.lat, longitude: position.lng });
    console.log(this.state.latitude);
  }

  render() {
    return (
      <div className="App">
        <div className="header-component">Welcome</div>
        <div className="app-body">
          <div className="map-component">{this.state.loadMaps ? <MapsComponent latitude={this.state.latitude} longitude={this.state.longitude}></MapsComponent> : ""}</div>
        </div>
        <div className="location-text"> You are at: {this.state.address}</div>
        {this.state.loadNearby ? <NearbyComponent resultData={this.resultData} onSelectPosition={this.handlePositionChange}></NearbyComponent> : ""}
      </div>
    );
  }
}

export default HomePage;