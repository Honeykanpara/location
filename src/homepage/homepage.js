import React, { Component } from 'react';

class HomePage extends Component {
    constructor(){
        super();
        this.state = {
            latitude: "",
            longitude: "",
            gapi_key: "AIzaSyBr9VoS8bsF3oVfNU9BQmo44M-oNascEIY";
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
      });
      this.codeLatLng(this.latitude,this.longitude);
    }
  }

  

  codeLatLng(lat, lng) {
    // console.log(google);
    // var city ="";
    // var geocoder = google.maps.Geocoder();
    // var latlng = google.maps.LatLng(lat, lng);
    // geocoder.geocode({'latLng': latlng}, function(results, status) {
    //   if (status == google.maps.GeocoderStatus.OK) {
    //   console.log(results)
    //     if (results[1]) {
    //      //formatted address
    //      alert(results[0].formatted_address)
    //     //find country name
    //          for (var i=0; i<results[0].address_components.length; i++) {
    //         for (var b=0;b<results[0].address_components[i].types.length;b++) {

    //         //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
    //             if (results[0].address_components[i].types[b] == "administrative_area_level_1") {
    //                 //this is the object you are looking for
    //                 city= results[0].address_components[i];
    //                 break;
    //             }
    //         }
    //     }
    //     //city data
    //     alert(city.short_name + " " + city.long_name)


    //     } else {
    //       alert("No results found");
    //     }
    //   } else {
    //     alert("Geocoder failed due to: " + status);
    //   }
    // });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div>Get your location</div><button onClick= {this.getLocation} >Get Location</button>
          <div>
         testtt {this.state.latitude} {this.state.longitude}
          </div>
        </header>
      </div>
    );
  }
}

export default HomePage;