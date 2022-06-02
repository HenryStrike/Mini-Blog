import React, { Component } from 'react';
import { GameMap } from "./game_map/base.js";
import { Kyo } from "./player/kyo.js";
import $ from "jquery";
import { connect } from 'react-redux';
import ACTIONS from './../../../redux/actions';

class KOF extends Component {
    constructor(props){
        super(props);
        this.$kof = null;
        this.game_map = null; 
        this.Players = [];
    }

    reloadGame() {
        if(this.game_map !== null){
            // restore initial state
            this.game_map.time_left = 60000;
            this.game_map.winner = false;
            this.Players[0].x = 200;
            this.Players[0].y = 0;
            this.Players[0].status = 3;
            this.Players[0].vy = 0;
            this.Players[0].HP = this.Players[0].maxHP;
            this.Players[0].update_hp_bar();
            this.Players[1].x = 950;
            this.Players[1].y = 0;
            this.Players[1].status = 3;
            this.Players[1].vy = 0;
            this.Players[1].HP = this.Players[1].maxHP;
            this.Players[1].update_hp_bar();
        }else{
            this.game_map = new GameMap(this);
            this.Players = [
                new Kyo(this, {
                    id: 0,
                    x: 200,
                    y: 0,
                    width: 130,
                    height: 220,
                }),
                new Kyo(this, {
                    id: 1,
                    x: 950,
                    y: 0,
                    width: 130,
                    height: 220,
                })
            ];
        }
        this.props.restart_update(false);
        this.game_map.$canvas.focus();
    }

    gameOver() {
        this.props.restart_update(true);
    }

    componentDidMount() {
        this.$kof = $('#kof');
    }

    render() { 
        return (
            <div id='kof'>
                {this.props.restart && <button onClick={()=>this.reloadGame()} className='btn btn-warning btn-lg'>Start Fight</button>}
            </div>
        );
    }
}

const mapStateToProps = (state, props) =>{
    return {
        restart : state.kofGame.restart,
    };
}

const mapDispatchToProps = {
    restart_update : (val) => ({
        type: ACTIONS.KOFSTART,
        val,
    })
};

 
export default connect(mapStateToProps, mapDispatchToProps)(KOF);