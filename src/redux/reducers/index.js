import { combineReducers } from 'redux'
import userReducer from './userReducer'
import postsReducer from './postsReducer'

const rootReducer = combineReducers({
    user: userReducer,
    post: postsReducer
})
export default rootReducer