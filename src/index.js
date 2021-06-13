import React from 'react';
import ReactDOM from 'react-dom';

import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';

class App extends React.Component {

    state = {lat: null, errorMessage: ''};

    componentDidMount() {
        console.log("Component rendered to screen");

        window.navigator.geolocation.getCurrentPosition(
            (position) => {
                // We call set state to update the state value of latitude
                this.setState(
                    {
                        latitude: position.coords.latitude
                    }
                );
            },
            (err) => {
                this.setState(
                    {
                        errorMessage: err.message
                    }
                );
            }
        );     
    }

    renderContent() {
        if(this.state.errorMessage && !this.state.latitude){
            return (
                <div>                   
                    Error: {this.state.errorMessage}
                </div>
            );
        }

        if(!this.state.errorMessage && this.state.latitude){
            return (
                <div>                   
                    <SeasonDisplay latitude={this.state.latitude} /> 
                </div>
            );
        }

       
        return <Spinner message="Please allow location" />;                
       
        
    }

    // Required by React
    render() {
        return (
           <div className="border red">
               {this.renderContent()}
           </div>
        )
        
    }
}

ReactDOM.render(
    <App />,
    document.querySelector('#root')
)