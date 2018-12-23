import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';


const mapStyles = {
    width: '40%',
    height: '40%'
  };

class MapsComponent extends Component {
        render() {
            return (
                <Map
            google={this.props.google}
            zoom={14}
            style={mapStyles}
            initialCenter={{
             lat: this.props.latitude,
             lng: this.props.longitude
            }}
          />
            )        
            
        }
    }

    export default GoogleApiWrapper({
        apiKey: 'AIzaSyBr9VoS8bsF3oVfNU9BQmo44M-oNascEIY'
      })(MapsComponent);
