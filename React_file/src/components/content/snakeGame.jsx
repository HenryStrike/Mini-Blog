import React, { Component } from 'react';
import BackGround from './snake/backGround';

class SnakeGame extends Component {
    state = {  } 
    render() { 
        return (
            <div className='App'>
                <BackGround/>
            </div>
        );
    }
}
 
export default SnakeGame;