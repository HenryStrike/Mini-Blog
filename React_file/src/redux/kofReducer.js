import ACTIONS from "./actions";

const kofReducer = (state = {
    restart : true,
}, action) =>{
    switch(action.type){
        case ACTIONS.KOFSTART:
            return {
                ...state,
                restart : action.val,
            };
        default:
            return state;
    }
}

export default kofReducer;