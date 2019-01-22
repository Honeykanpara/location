import React, { Component } from 'react';

class DetailsComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
            <div className="location-header">Location Details</div>
            <div className="address-table">
                <div>
                    <div className="address-head">
                        Latitude
                    </div>
                    <div className="address-body">
                        {this.props.latitude}
                    </div>
                </div>
                <div>
                    <div className="address-head">
                        Longitude
                    </div>
                    <div className="address-body">
                        {this.props.longitude}
                    </div>
                    </div>
                <div>
                    <div className="address-head">
                        City
                    </div>
                    <div className="address-body">
                        {this.props.addressDetails.cityName}
                    </div>
                    </div>
                <div>
                    <div className="address-head">
                        Country
                    </div>
                    <div className="address-body">
                        {this.props.addressDetails.countryName}
                    </div>
                    </div>
                <div>
                    <div className="address-head">
                        Zip Code
                    </div>
                    <div className="address-body">
                        {this.props.addressDetails.zipCode}
                    </div>
                    </div>
                <div>
                    <div className="address-head">
                        Ip Address
                    </div>
                    <div className="address-body">
                        {this.props.addressDetails.ipAddress}
                    </div>
                </div>
            </div>
            </div>
        )

    }
}

export default DetailsComponent;