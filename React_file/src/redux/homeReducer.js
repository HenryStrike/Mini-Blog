import ACTIONS from './actions';


const homePage = (state={
    posts:[
        {
            id: 1,
            userId: 1,
            content: "Post your first idea!",
            postTime: "5.21 2022 3:16PM"
        },
    ],
    idx: 2,

}, action) =>{
    switch(action.type){
        case ACTIONS.SUBMIT_A_POST:
            if(action.content===""){
                return state;
            }
            return {
                ...state,
                posts: [
                    {
                        id: state.idx,
                        userId: 1,
                        content: action.content,
                        postTime: "5.21 2022 3:16PM"
                    },
                    ...state.posts,
                ],
                idx: state.idx+1
            };
        case ACTIONS.DELETE_A_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post.id!==action.id),
            };
        default:
            return state;
    }
}

export default homePage;