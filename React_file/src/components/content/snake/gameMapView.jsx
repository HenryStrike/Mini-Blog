import React, { Component } from 'react';
import { GameMap } from './scripts/gameMap';
import { connect } from 'react-redux';
import ACTIONS from './../../../redux/actions';

class GameMapView extends Component {
    constructor(props){
        super(props);
        this.div = React.createRef();
        this.canvas = React.createRef();

        this.gamemap = null;
    }

    componentDidMount(){
        this.gamemap = new GameMap(this.canvas.current.getContext('2d'), this.div.current, this.props.update_score, this.props.restart_update);
    }

    restart() {
        this.props.restart_update(!this.props.restart);
        this.gamemap.restart();
    }

    render() { 
        return (
            <div className='game-map' ref={this.div}>
                <canvas className='snake-canvas' ref={this.canvas} tabIndex='0'></canvas>
                {this.props.restart && <button onClick={()=>this.restart()} className='btn btn-primary btn-lg'>Start Game</button>}
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        restart : state.snakeGame.restart,
    };
}

const mapDispatchToProps = {
    update_score : (val) => ({
        type : ACTIONS.UPDATE_SCORE,
        val,
    }),
    restart_update : (val) => ({
        type : ACTIONS.RESTART_UPDATE,
        val,
    }),
}
 
export default connect(mapStateToProps, mapDispatchToProps)(GameMapView);