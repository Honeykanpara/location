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
        setTimeout(()=>{
            this.setState({
                position: {
                    lat: this.props.latitude,
                    lng: this.props.longitude
                }
            });
        },10);
    }
    render() {
        return (
            <div>
                    <Map
                    google={this.props.google}
                    zoom={14}
                    style={mapStyles}
                    center={{
                        lat: this.state.position.lat,
                        lng: this.state.position.lng
                    }}
                    onClick={this.onMapClicked} className="map"
                >
                    <Marker name={'Current location'} onClick={this.onMarkerClick} position={this.state.position} />
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
