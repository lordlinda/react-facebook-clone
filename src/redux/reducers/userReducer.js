import { SET_USER, LOGIN_USER, SET_UNAUTHENTICATED, SET_AUTHENTICATED, LOADING_UI, GET_LIKES, CREATE_LIKE, GET_NOTIFICATIONS, CREATE_NOTIFICATION, GET_SHARED_POSTS, CREATE_SHARED_POST, UNLIKE_POST, SET_USER_PROFILE } from '../actions/types'

const initialState = {
    user: null,
    authenticated: false,
    loading: false,
    profile: null,
    likes: [],
    notifications: [],
    sharedPosts: []
}


export default function (state = initialState, action) {
    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state,
                user: action.payload
            }
        case SET_USER:
            return {
                ...state,
                user: action.payload,
                loading: false,
                authenticated: true
            }
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true
            }
        case SET_UNAUTHENTICATED:
            return {
                ...state,
                authenticated: false
            }
        case LOADING_UI:
            return {
                ...state,
                loading: true
            }
        case GET_LIKES:
            return {
                ...state,
                likes: action.payload
            }
        case CREATE_LIKE:
            return {
                ...state,
                likes: [action.payload, ...state.likes]
            }
        case GET_NOTIFICATIONS:
            return {
                ...state,
                notifications: action.payload
            }
        case CREATE_NOTIFICATION:
            return {
                ...state,
                notifications: [action.payload, ...state.notifications]
            }
        case GET_SHARED_POSTS:
            return {
                ...state,
                sharedPosts: action.payload
            }
        case CREATE_SHARED_POST:
            return {
                ...state,
                sharedPosts: [action.payload, ...state.sharedPosts]
            }
        case UNLIKE_POST:
            let index = state.likes.findIndex(like => like.postId === action.payload.postId)
            console.log(index)
            state.likes.splice(index, 1)
            return {
                ...state
            }
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.payload,
                loading: false,
                authenticated: true

            }

        default:
            return state
    }
}
