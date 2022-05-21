import ACTIONS from './actions';

const evaluate = (state) =>{
    let {last_operand, operation, current_operand} = state;
    let last = parseFloat(last_operand);
    let current = parseFloat(current_operand);
    
    let res = "";
    switch(operation){
        case "+":
            res = last + current;
            break;
        case "-":
            res = last - current;
            break;
        case "×":
            res = last * current;
            break;
        case "÷":
            res = last / current;
            break;
    }
    return res.toString();
}

const calculator = (state={
    current_operand: "0",
    operation: "",
    last_operand: "",
    overwrite: false
}, action) => {
    switch(action.type){
        case ACTIONS.ADD_DIGIT:
            if(state.overwrite){
                return {
                    ...state,
                    current_operand: action.value,
                    overwrite: false,
                }
            }
            if(state.current_operand==="0"&&action.value!=="."){
                return {
                    ...state,
                    current_operand: action.value
                }
            }else if(action.value==="."&&state.current_operand.includes(".")){
                return state;
            }
            return {
                ...state,
                current_operand: state.current_operand + action.value
            };
        case ACTIONS.DELETE_DIGIT:
            if(state.current_operand.length===1){
                return {
                    ...state,
                    current_operand: "0"
                }
            }
            return {
                ...state,
                current_operand:state.current_operand.slice(0, -1),
            }
        case ACTIONS.CLEAR:
            return {
                ...state,
                current_operand: "0",
                operation: "",
                last_operand: "",
            }
        case ACTIONS.CHOOSE_OPERATION:
            if(state.last_operand===""){
                return {
                    ...state,
                    operation: action.operation,
                    last_operand: state.current_operand,
                    current_operand: "0"
                };
            }else if(state.current_operand==="0"){
                return {
                    ...state,
                    operation: action.operation,
                }
            }
            return {
                ...state,
                last_operand: evaluate(state),
                operation: action.operation,
                current_operand: "0",
            }
        case ACTIONS.EVALUATE:
            if(state.operation===""){
                return state;
            }
            return {
                ...state,
                current_operand: evaluate(state),
                last_operand: "",
                operation: "",
                overwrite: true,
            }
        default:
            return state;
    }
};

export default calculator;