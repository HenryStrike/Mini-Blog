import React, { Component } from 'react';
import GameMapView from './gameMapView';
import ScoreBar from './scoreBar';

class BackGround extends Component {
    state = {  } 
    render() { 
        return (
            <div className='background'>
                <ScoreBar/>
                <GameMapView/>
            </div>
        );
    }
}
 
export default BackGround;