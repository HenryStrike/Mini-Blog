import React, { Component } from 'react';
import { connect } from 'react-redux';
import ACTIONS from '../../../redux/actions';

class DigitButton extends Component {
    state = {  } 
    render() { 
        return (
            <button onClick={()=>this.props.add_digit(this.props.digit)} className="btn btn-dark">
                {this.props.digit}
            </button>
        );
    }
}

const mapDispatchToprops = {
    add_digit: (digit)=>({type:ACTIONS.ADD_DIGIT, value: digit}),
}
 
export default connect(null, mapDispatchToprops)(DigitButton);