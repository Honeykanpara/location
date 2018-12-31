import React, { Component } from 'react';
import MapsComponent from '../mapsComponent/mapsComponent.js';
import Geocode from "react-geocode";
import NearbyComponent from '../nearbyComponent/nearbyComponent.js';
import AdSense from 'react-adsense';

Geocode.setApiKey("AIzaSyBr9VoS8bsF3oVfNU9BQmo44M-oNascEIY");

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: "",
      longitude: "",
      loadMaps: false,
      address: "",
      markerName: "Current Location"
    }
    this.getLocation = this.getLocation.bind(this);
    this.handlePositionChange = this.handlePositionChange.bind(this);
    this.geoPluginAddress={};
  }
  handleChange = (e) => {
    this.setState({ latitude: e.latitude, longitude: e.longitude, loadMaps: true });
    this.getAddress(e.latitude, e.longitude);
  }
  getLocation() {
    if (navigator.geolocation !== {}) {
      
      navigator.geolocation.getCurrentPosition((position) => {
        this.handleChange(position.coords);
      });
    } 
        //getting ip based location
        fetch("http://www.geoplugin.net/json.gp")
        .then(res => res.json())
        .then(
            ( result ) => {
              this.geoPluginAddress=result;
              if(this.state.loadMaps == false) {
                let position={latitude: this.geoPluginAddress.geoplugin_latitude, longitude: this.geoPluginAddress.geoplugin_longitude};
                this.handleChange(position);
          
              }
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

  handlePositionChange(position, name) {
    this.setState({ latitude: position.lat, longitude: position.lng, markerName: name });
  }

  render() {
    return (
      <div className="App">
        <div className="header-component">
          <div className="header">
          <img src={'/images/logo.png'} className="header-logo"/>
            AboutMyLocation
            </div>
        </div>
        {this.state.latitude === "" && <div className="allow-location"><span>Please allow location detection from setting to get better look at site.</span></div>}
        {this.state.latitude !== "" && <div>
          <div className="app-body">
            <div className="map-component">{this.state.loadMaps ? <MapsComponent latitude={this.state.latitude} longitude={this.state.longitude} markerName={this.state.markerName}></MapsComponent> : ""}</div>
          </div>
          {this.state.address !== "" && <div className="location-text"> <span className ="bold-italic">Current Location:</span> {this.state.address}</div>}
          {this.state.loadMaps ? <NearbyComponent latitude={this.state.latitude} longitude={this.state.longitude} onSelectPosition={this.handlePositionChange}></NearbyComponent> : ""}
        </div>
        }
                <AdSense.Google
          client='ca-pub-7414322368995670'
          slot='7806394673'
          style={{ display: 'block' }}
          format='auto'
          responsive='true'

        />
      </div>
    );
  }
}

export default HomePage;