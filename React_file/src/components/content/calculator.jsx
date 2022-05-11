import React, { Component } from 'react';
import Content from './base';
import DigitButton from './calculator/digit_button';
import { connect } from 'react-redux';
import OperationButton from './calculator/operation_button';
import ACTIONS from './../../redux/actions';

class Calculator extends Component {
    state = {  
        formater: Intl.NumberFormat('en-us')
    } 

    format = (number) =>{
        let [integer, decimal] = number.split('.');
        if(decimal === undefined){
            return this.state.formater.format(integer);
        }else{
            return `${this.state.formater.format(integer)}.${decimal}`;
        }
    }

    render() { 
        return (
            <Content>
                <div className="calculator">
                    <div className="output">
                        <div className="last-output">
                            {this.format(this.props.lastOprand)+this.props.Operation}
                        </div>
                        <div className="current-output">
                            {this.format(this.props.currentOperand)}
                        </div>
                    </div>
                    <button onClick={this.props.clear} className='span-1-2 btn btn-warning'>AC</button>
                    <button onClick={this.props.delete_digit} className="btn btn-danger">Del</button>
                    <OperationButton operation="÷"/>
                    <DigitButton digit="7"/>
                    <DigitButton digit="8"/>
                    <DigitButton digit="9"/>
                    <OperationButton operation="×"/>
                    <DigitButton digit="4"/>
                    <DigitButton digit="5"/>
                    <DigitButton digit="6"/>
                    <OperationButton operation="-"/>
                    <DigitButton digit="1"/>
                    <DigitButton digit="2"/>
                    <DigitButton digit="3"/>
                    <OperationButton operation="+"/>
                    <DigitButton digit="0"/>
                    <DigitButton digit="."/>
                    <button onClick={this.props.evaluate} className='span-3-2 btn btn-primary'>=</button>
                </div>
            </Content>
        );
    }
}


const mapStateToProps = (state, props) =>{
    return{
        currentOperand: state.current_operand,
        lastOprand: state.last_operand,
        Operation: state.operation,
    };
}

const mapDispatchToProps = {
    delete_digit:()=>({
        type: ACTIONS.DELETE_DIGIT
    }),
    clear: ()=>({
        type: ACTIONS.CLEAR
    }),
    evaluate: ()=>({
        type: ACTIONS.EVALUATE
    })
}
 
export default connect(mapStateToProps, mapDispatchToProps)(Calculator);