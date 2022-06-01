import React, { Component } from 'react';
import Content from './base';
import ACTIONS from './../../redux/actions';
import { connect } from 'react-redux';

class GameIntro extends Component {
    
    selectKOF(){
        this.props.select_kof();
    }

    selectSnake(){
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

const mapDispatchToProps = {
    select_kof : () => ({
        type:ACTIONS.SELECTKOF,
    }),
    select_snake : () => ({
        type:ACTIONS.SELECTSNAKE,
    }),
};
 
export default connect(null, mapDispatchToProps)(GameIntro);