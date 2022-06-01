import React, { Component } from 'react';
import {KOF} from './kof/base.js';

class KOFGame extends Component {
    constructor(props){
        super(props);
        this.kof = React.createRef();
        this.kof_gamemap = null;
    }

    componentDidMount() {
        this.kof_gamemap = new KOF('kof');
    }

    render() { 
        return (
            <div id='kof' ref={this.kof}></div>
        );
    }
}
 
export default KOFGame;