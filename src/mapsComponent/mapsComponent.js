import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';


const mapStyles = {
    width: '80%',
    height: '100%',
    margin: '0 10%'
};

class MapsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            lat: this.props.latitude,
            lng: this.props.longitude
        };
    }

    onMarkerClick = (props, marker, e) => {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
    }

    componentDidMount() {
    }

    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
    };

    componentWillReceiveProps(){
        // this.forceUpdate();
        // console.log("updatee");
        this.setState({
            lat: this.props.latitude,
            lng: this.props.longitude,
          });

        }
    render() {
        return (
            <div>
                <Map
                    google={this.props.google}
                    zoom={14}
                    style={mapStyles}
                    initialCenter={{
                        lat: this.state.lat,
                        lng: this.state.lng
                    }} onClick={this.onMapClicked} className="map"
                >
                    <Marker name={'Current location'} onClick={this.onMarkerClick} />
                    <InfoWindow marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}>
                        <div>
                            <h1 className="current-location">{this.state.selectedPlace.name}</h1>
                        </div>
                    </InfoWindow>
                </Map>
            </div>
        )

    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyBr9VoS8bsF3oVfNU9BQmo44M-oNascEIY'
})(MapsComponent);
