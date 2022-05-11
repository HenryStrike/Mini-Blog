import React, { Component } from 'react';
import { connect } from 'react-redux';
import ACTIONS from '../../../redux/actions';

class OperationButton extends Component {
    state = {  } 
    render() { 
        return (
            <button onClick={()=>this.props.choose_operation(this.props.operation)} className="btn btn-secondary">
                {this.props.operation}
            </button>
        );
    }
}

const mapDispatchToProps = {
    choose_operation: (Operation)=>({
        type: ACTIONS.CHOOSE_OPERATION,
        operation: Operation,
    }),
}
 
export default connect(null, mapDispatchToProps)(OperationButton);