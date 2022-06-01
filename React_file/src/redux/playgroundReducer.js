import ACTIONS from './actions';


const PlayGroundReducer = (state = {
    selectKOF : false,
    selectSnake : false,
}, action) => {
    switch(action.type){
        case ACTIONS.SELECTKOF:
            return {
                ...state,
                selectKOF: true,
                selectSnake: false,
            }
        case ACTIONS.SELECTSNAKE:
            return {
                ...state,
                selectKOF: false,
                selectSnake: true,
            }
        default:
            return state;
    }
}

export default PlayGroundReducer;