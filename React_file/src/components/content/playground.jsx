import React, { Component } from 'react';
import GameIntro from './gameIntro';
import KOFGame from './kofGame';
import SnakeGame from '../snakeGame';
import { connect } from 'react-redux';

class PlayGround extends Component {

    render() { 
        return (
            <React.Fragment>
                <GameIntro/>
                <div className='GameView'>
                    {this.props.skof && <KOFGame/>}
                    {this.props.ssnake && <SnakeGame/>}
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state, props) =>({
    skof : state.playground.selectKOF,
    ssnake : state.playground.selectSnake,
});
 
export default connect(mapStateToProps)(PlayGround);