import ACTIONS from "./actions";

const snakeGame = (state={
    score : 0,
    record : 0,
    restart : true,
}, action) =>{
    switch(action.type){
        case ACTIONS.UPDATE_SCORE:
            return {
                ...state,
                score : action.val,
                record : Math.max(action.val, state.score),
            };
        case ACTIONS.RESTART_UPDATE:
            return {
                ...state,
                restart : action.val,
            }
        default:
            return state;
    }
}

export default snakeGame