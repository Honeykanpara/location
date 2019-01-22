import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';


const mapStyles = {
    width: '100%',
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
            position: {
                lat: this.props.latitude,
                lng: this.props.longitude
            }
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
        this.setState({
            position: {
                lat: this.props.latitude,
                lng: this.props.longitude
            }
        });
    }

    onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            })
        }
    };

    componentWillReceiveProps() {

        //setting timeout as setState takes time
        setTimeout(() => {
            this.setState({
                position: {
                    lat: this.props.latitude,
                    lng: this.props.longitude
                }
            });
        }, 10);
    }
    render() {
        return (
            <div>
                <Map
                    google={this.props.google}
                    zoom={16}
                    style={mapStyles}
                    center={{
                        lat: this.state.position.lat,
                        lng: this.state.position.lng
                    }}
                    gestureHandling={"greedy"}
                    onClick={this.onMapClicked} className="map"
                >
                    <Marker name={this.props.markerName} onClick={this.onMarkerClick} position={this.state.position} />
                    <InfoWindow marker={this.state.activeMarker}
                        visible={this.state.showingInfoWindow}>
                            <div className="current-location">{this.state.selectedPlace.name}</div>
                    </InfoWindow>
                </Map>
            </div>
        )

    }
}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_KEY
})(MapsComponent);
