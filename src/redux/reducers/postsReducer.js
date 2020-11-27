import { GET_POSTS, CREATE_COMMENT, GET_COMMENTS, LOADING_POST, GET_POST, CREATE_LIKE, UNLIKE_POST, CREATE_POST } from '../actions/types'

const initialState = {
    posts: [],
    comments: [],
    loading: false,
    post: {}
}


export default function (state = initialState, action) {
    switch (action.type) {
        case GET_POSTS:
            return {
                ...state,
                loading: false,
                posts: action.payload
            }
        case CREATE_POST:
            return {
                ...state,
                posts: [action.payload, ...state.posts]
            }
        case CREATE_COMMENT:
            return {
                ...state,
                comments: [action.payload, ...state.comments]
            }
        case GET_COMMENTS:
            return {
                ...state,
                comments: action.payload
            }
        case LOADING_POST:
            return {
                ...state,
                loading: true
            }
        case GET_POST:
            return {
                ...state,
                loading: false,
                post: action.payload
            }
        case CREATE_LIKE:
        case UNLIKE_POST:
            let index = state.posts.findIndex(post => post.id === action.payload.postId)
            console.log(action.payload);
            state.posts[index].likeCount = action.payload.likeCount
            return {
                ...state
            }


        default:
            return state
    }
}
