import React, { Component } from 'react';
import MapsComponent from '../mapsComponent/mapsComponent.js';
import Geocode from "react-geocode";
import NearbyComponent from '../nearbyComponent/nearbyComponent.js';
import DetailsComponent from '../detailsComponent/detailsComponent.js';
import AdSense from 'react-adsense';

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_KEY);

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: "",
      longitude: "",
      loadMaps: false,
      address: "",
      markerName: "Current Location",
      addressDetails:{
        countryName:"",
        cityName:"",
        zipCode: "",
        ipAddress:""
      }
    }
    this.showWarning = false;
    this.getLocation = this.getLocation.bind(this);
    this.handlePositionChange = this.handlePositionChange.bind(this);
    this.geoPluginAddress={};
  }
  handleChange = (e) => {
    this.setState({ latitude: e.latitude, longitude: e.longitude, loadMaps: true });
    this.getAddress(e.latitude, e.longitude);
  }
  getLocation() {

    if (navigator.geolocation) {  
      navigator.geolocation.getCurrentPosition((position) => {
        this.handleChange(position.coords);
        this.showWarning = false;
      });
    } 
        //getting ip based location
        fetch("https://geoip-db.com/json/")
        .then(res => res.json())
        .then(
            ( result ) => {
              this.geoPluginAddress=result;
              this.setState({
                addressDetails:{
                  countryName: this.geoPluginAddress.country_name,
                  cityName: this.geoPluginAddress.city,
                  zipCode: this.geoPluginAddress.postal,
                  ipAddress: this.geoPluginAddress.IPv4
                }
              })
              if(this.state.loadMaps == false) {
                this.showWarning = true;
                let position={latitude: this.geoPluginAddress.latitude, longitude: this.geoPluginAddress.longitude};
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
            <div className="description">
            {`About My Location is a basic app which detects your current address and displays near by places on map. Get to know about your location and see important nearby places on map.\nHappy hunting !!!`}
              </div>
            
        </div>
        {this.state.latitude === "" && <div className="allow-location"><span>Allow location detection from setting to get better look at site.</span></div>}
        {this.state.latitude !== "" && <div>
        {this.showWarning && <div>Turn on browser location for more accurate positioning.</div>}
          <div className="app-body">
            <div className="map-component">{this.state.loadMaps ? <MapsComponent latitude={this.state.latitude} longitude={this.state.longitude} markerName={this.state.markerName}></MapsComponent> : ""}</div>
            <div className="info-table"><DetailsComponent latitude={this.state.latitude} longitude={this.state.longitude} addressDetails={this.state.addressDetails}></DetailsComponent></div>
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