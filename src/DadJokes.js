import React, { Component } from 'react';
import axios from 'axios';
import Joke from './Joke';
import './DadJokes.css';

class DadJokes extends Component {
    constructor(props) {
        super(props);

        this.api_url = 'https://icanhazdadjoke.com/';

        this.state = {
            jokes: [],
            isLoading: false
        }
        this.getJokes = this.getJokes.bind(this);
        this.getMoreJokes = this.getMoreJokes.bind(this);
    }

    async getJokes(count = 10) {
        const jokes = [];
        // Set isLoading to true to show the activity spinner
        this.setState({ isLoading: true });
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
                jokes: [...cs.jokes, ...jokes],
                isLoading: false
            };
        });
    }

    getMoreJokes(e) {
        this.getJokes(10);
    }

    componentDidMount() {
        this.getJokes(5);
    }

    render() {
        const jokes = this.state.jokes.map(j => {
            return <Joke key={j.id} id={j.id} joke={j.joke} />
        });
        return(
            <div className="DadJokes">
                <h1>Dad Jokes</h1>
                <div className="DadJokes-container">
                    <div className="DadJokes-control">
                        <img src='./Koya.svg' alt="Koya" />
                        <button onClick={this.getMoreJokes}>Get More Jokes!</button>
                        {this.state.isLoading ? <div className='loader'>Loading...</div> : ''}
                    </div>
                    <div className="DadJokes-jokes">
                        {jokes}
                    </div>
                </div>
            </div>
        );
    }
}

export default DadJokes;