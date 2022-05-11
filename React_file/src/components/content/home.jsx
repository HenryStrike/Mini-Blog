import React, { Component } from 'react';
import Content from './base';

class Home extends Component {
    state = {  } 
    render() { 
        return (
            <Content>
                <h5 className="card-title">Home Page</h5>
                <h6 className="card-subtitle mb-2 text-muted">Still working</h6>
                <p className="card-text">Welcome all !!</p>
                <a href="https://github.com/HenryStrike" className="card-link">Github</a>
            </Content>
        );
    }
}
 
export default Home;