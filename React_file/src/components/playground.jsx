import React, { Component } from 'react';
import GameIntro from './content/gameIntro';
import { KOF } from './content/kof/base';

class PlayGround extends Component {
    constructor(props){
        super(props);
        this.kof = React.createRef();
    }

    componentDidMount() {
        new KOF('kof');
    }

    render() { 
        return (
            <React.Fragment>
                <GameIntro/>
                <div id='kof' ref={this.kof}></div>
            </React.Fragment>
        );
    }
}
 
export default PlayGround;