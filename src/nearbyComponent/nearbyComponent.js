import React, { Component } from 'react';


class NearbyComponent extends Component {
    constructor() {
        super();
        this.handlePositionChange = this.handlePositionChange.bind(this);
    }

    componentDidMount(){
        console.log("Nearbyyy")
    }

    handlePositionChange = (position) => {
        this.props.onSelectPosition(position);            
    }


    render() {
        return (
        <div className="nearby">
            <div>Nearby Hospitals</div>
            <ul>
            {this.props.resultData.map((result)=> {
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