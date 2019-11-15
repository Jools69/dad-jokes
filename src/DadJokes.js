import React, { Component } from 'react';
import axios from 'axios';
import Joke from './Joke';
import './DadJokes.css';

class DadJokes extends Component {
    constructor(props) {
        super(props);

        this.api_url = 'https://icanhazdadjoke.com/';

        this.state = {
            jokes: []
        }
        this.getJokes = this.getJokes.bind(this);
        this.getMoreJokes = this.getMoreJokes.bind(this);
    }

    async getJokes(count = 10) {
        const jokes = [];
        while(count) {
            // request the initial joke
            let response = await axios.get(this.api_url, { headers: { Accept: 'application/json'}});
            // keep requesting jokes while the returned joke is in our existing jokes
            while([...this.state.jokes, ...jokes].find(e => e.id === response.data.id) !== undefined) {
                response = await axios.get(this.api_url, { headers: { Accept: 'application/json'}});
            }
            const newJoke = { id: response.data.id, joke: response.data.joke};
            jokes.push(newJoke);
            count--;
        }
        this.setState(cs => {
            return {
                jokes: [...cs.jokes, ...jokes]
            };
        });
    }

    getMoreJokes(e) {
        this.getJokes(10);
    }

    componentDidMount() {
        this.getJokes(5);
        console.log('in componentDidMount', this.state.jokes);
    }

    render() {
        console.log('In Render', this.state.jokes);
        const jokes = this.state.jokes.map(j => {
            return <Joke key={j.id} id={j.id} joke={j.joke} />
        });
        console.log('Joke line items: ', jokes);
        return(
            <div className="DadJokes">
                <h1>Dad Jokes</h1>
                <button onClick={this.getMoreJokes}>Get More Jokes!</button>
                {jokes}
            </div>
        );
    }
}

export default DadJokes;