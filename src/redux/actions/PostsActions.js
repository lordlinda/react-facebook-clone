import moment from 'moment'
import db from '../../firebase'
import { GET_POSTS, LOADING_POST, GET_POST } from './types'

export const getPosts = () => dispatch => {
    dispatch({ type: LOADING_POST })
    db.collection('posts')
        .orderBy('timestamp', 'desc')
        .onSnapshot(snapshot => {
            let posts = []
            snapshot.forEach(doc => {
                posts.push({
                    id: doc.id,
                    profilePic: doc.data().profilePic,
                    image: doc.data().image,
                    username: doc.data().username,
                    timestamp: doc.data().timestamp,
                    message: doc.data().message,
                    userId: doc.data().userId,
                    likeCount: doc.data().likeCount
                })


            })

            dispatch({
                type: GET_POSTS,
                payload: posts
            })
        })
}

export const getSinglePost = (id) => dispatch => {
    dispatch({ type: LOADING_POST })
    db.collection('posts')
        .doc(id)
        .get()
        .then(doc => {
            console.log(doc.data());
            dispatch({
                type: GET_POST,
                payload: doc.data()
            })

        })
}

export const createPost = (inputData) => dispatch => {
    console.log(inputData);
    const post = {
        profilePic: inputData.profilePic,
        username: localStorage.displayName,
        userId: localStorage.userId,
        message: inputData.input,
        image: inputData.imageUrl,
        likeCount: 0,
        timestamp: moment().toISOString()
    }
    db.collection('posts')
        .add(post)
        .then(doc => {
            console.log(doc)

        }).catch(error => {
            console.error(error)
        })

}






