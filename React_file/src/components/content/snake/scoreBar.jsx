import React, { Component } from 'react';
import { connect } from 'react-redux';

class ScoreBar extends Component {
    state = {  } 
    render() { 
        return (
            <div className='score-bar'>
                <div className='apple'>
                    <img src="http://175.178.193.39:8080/images/objects/apple.png" alt="apple" />
                    <div>{this.props.score}</div>
                </div>
                <div className='cup'>
                    <img src="http://175.178.193.39:8080/images/objects/cup.png" alt="cup" />
                    <div>{this.props.record}</div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, props) =>{
    return{
        score : state.snakeGame.score,
        record : state.snakeGame.record,
    };
}
 
export default connect(mapStateToProps)(ScoreBar);