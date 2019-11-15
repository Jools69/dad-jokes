import React, { Component } from 'react';
import './Joke.css';

class Joke extends Component {
    // Props:
    // id
    // joke
    constructor(props) {
        super(props);
        this.state = {
            rating: 0
        }
    }

    render() {
        return(
            <div className="Joke">
                <span className="Joke-joke">{this.props.joke}</span>
                <span className="Joke-rating"> - Rating: {this.state.rating}</span>
            </div>
        );
    }
}

export default Joke;