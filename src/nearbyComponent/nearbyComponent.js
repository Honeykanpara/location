import React, { Component } from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';


class NearbyComponent extends Component {
    constructor() {
        super();
        this.handlePositionChange = this.handlePositionChange.bind(this);
        this.toggle = this.toggle.bind(this);
        this.menuSelect = this.menuSelect.bind(this);
        this.dummyData=[];
        this.state = {
            resultData: [],
            dropdownOpen: false,
            dropdownItems: ""
        };
        this.dropdownItemsArray= ["hospital", "school", "bank"];
    }

    componentDidMount(){
        // this.placeSearch(this.props.latitude, this.props.longitude, 1000);
        let temp = this.dropdownItemsArray.map((item) => <DropdownItem onClick={() => this.menuSelect(item)}>{item}</DropdownItem>);
        this.setState({dropdownItems: temp});
    }

    handlePositionChange = (position) => {
        this.props.onSelectPosition(position);   
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera         
    }

    placeSearch(latitude, longitude, radius, type) {

        fetch('https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + latitude + ',' + longitude + '&radius=' + radius + '&types='+type+'&key=AIzaSyBr9VoS8bsF3oVfNU9BQmo44M-oNascEIY')
          .then(res => res.json())
          .then(
            (result) => {
                this.dummyData =[];
              result.results.map((res) => {
                this.dummyData.push(res);
              }
              );
              this.setState({resultData: this.dummyData});
              console.log(this.state.resultData);
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
    this.placeSearch(this.props.latitude, this.props.longitude, 1000, item); 
        
    }

    render() {
        return (
        <div className="nearby">
            <div>What you want to search?</div>
            <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                <DropdownToggle caret>
                Button Dropdown
                </DropdownToggle>
                <DropdownMenu>
                    {this.state.dropdownItems}
                </DropdownMenu>
            </ButtonDropdown>
            <ul>
            {this.state.resultData.map((result)=> {
            return <li>
            <div className="list-name">
                {result.name}
            </div>
            <div>
                Address: {result.vicinity}
            </div>
            <button onClick={()=> this.handlePositionChange(result.geometry.location)}>Display On Maps</button>
            </li>;
          })}
          </ul>
        </div>
            
        )

    }
}

export default NearbyComponent;