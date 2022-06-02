import React, { Component } from 'react';
import Content from './base';
import ACTIONS from './../../redux/actions';
import { connect } from 'react-redux';

class GameIntro extends Component {
    
    selectKOF(){
        if(!this.props.kofRestart){
            this.props.update_kof(true);
        }
        this.props.select_kof();
    }

    selectSnake(){
        if(!this.props.snakeRestart){
            this.props.update_snake(true);
        }
        this.props.select_snake();
    }

    render() { 
        return (
            <Content>
                <div className='gameintro'>This is a Game PlayGround, you can select a game below:</div>
                <div className='gameselect'>
                    <button onClick={()=>this.selectKOF()} className='btn btn-primary me-5 mt-3'>KOF</button>
                    <button onClick={()=>this.selectSnake()} className='btn btn-primary ms-5 mt-3'>Snake</button>
                </div>
            </Content>
        );
    }
}

const mapStateToProps = (state, props) =>{
    return {
        kofRestart : state.kofGame.restart,
        snakeRestart : state.snakeGame.restart,
    };
}

const mapDispatchToProps = {
    select_kof : () => ({
        type : ACTIONS.SELECTKOF,
    }),
    select_snake : () => ({
        type : ACTIONS.SELECTSNAKE,
    }),
    update_kof : (val) =>({
        type : ACTIONS.KOFSTART,
        val,
    }),
    update_snake : (val) =>({
        type : ACTIONS.RESTART_UPDATE,
        val,
    })
};
 
export default connect(mapStateToProps, mapDispatchToProps)(GameIntro);