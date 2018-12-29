import React, { Component } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Loader from 'react-loader';


class NearbyComponent extends Component {
    constructor() {
        super();
        this.handlePositionChange = this.handlePositionChange.bind(this);
        this.toggle = this.toggle.bind(this);
        this.menuSelect = this.menuSelect.bind(this);
        this.dummyData = [];
        this.state = {
            resultData: [],
            dropdownOpen: false,
            dropdownItems: "",
            selectedValue: "Select",
            isLoaded: false,
        };
        this.dropdownItemsArray = [{"displayName":"Hospital","name":"hospital"}, 
        {"displayName":"School","name":"school"}, 
        {"displayName":"Bank","name":"bank"},
        {"displayName":"ATM","name":"atm"},
        {"displayName":"Cafe","name":"cafe"},
        {"displayName":"Petrol Pump","name":"gas_station"},
        {"displayName":"Movie Theater","name":"movie_theater"},
        {"displayName":"Parking","name":"parking"},
        {"displayName":"Pharmacy","name":"pharmacy"},
        {"displayName":"Supermarket","name":"supermarket"}];
    }

    componentDidMount() {
        let temp = this.dropdownItemsArray.map((item) => <DropdownItem onClick={() => this.menuSelect(item)}>{item.displayName}</DropdownItem>);
        this.setState({ dropdownItems: temp, isLoaded: true });
        this.placeSearch(this.props.latitude, this.props.longitude, 3000, 'hospital');
        this.setState({selectedValue: "Hospital"})
    }

    handlePositionChange = (position, name) => {
        this.props.onSelectPosition(position, name);
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera         
    }

    placeSearch(latitude, longitude, radius, type) {

        this.setState({isLoaded: false});
        fetch('https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + latitude + ',' + longitude + '&radius=' + radius + '&types=' + type + '&key=AIzaSyBr9VoS8bsF3oVfNU9BQmo44M-oNascEIY')
            .then(res => res.json())
            .then(
                (result) => {
                    this.dummyData = [];
                    result.results.map((res) => this.dummyData.push(res));
                    this.setState({ resultData: this.dummyData, isLoaded: true });
                },
                (error) => {
                }
            )
    }


    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    menuSelect(item) {
        this.placeSearch(this.props.latitude, this.props.longitude, 3000, item.name);
        this.setState({ selectedValue: item.displayName });

    }

    render() {
        return (
            <div className="nearby">
                <span className="bold-italic">Select Nearby Places</span>
                <ButtonDropdown className="dropdown" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                    <DropdownToggle caret>
                        {this.state.selectedValue}
                    </DropdownToggle>
                    <DropdownMenu>
                        {this.state.dropdownItems}
                    </DropdownMenu>
                </ButtonDropdown>
                <ul className="search-list">
                <Loader loaded={this.state.isLoaded}/>
                    {this.state.resultData.map((result) => {
                        return <li className="list-element">
                                    <div className="list-name bold-italic" onClick={()=> this.handlePositionChange(result.geometry.location, result.name)}>
                                        Name: <span className="name-head">{result.name}</span>
                                    </div>
                                    <div>
                                        <span className="bold-italic">Address:</span> {result.vicinity}
                                    </div>
                        </li>;
                    })}
                </ul>
            </div>

        )

    }
}

export default NearbyComponent;