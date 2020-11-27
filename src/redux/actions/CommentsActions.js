import db from '../../firebase'
import { GET_COMMENTS } from './types'
import { createNotification } from './NotificationActions'

export const commentOnPost = (comment) => dispatch => {
    db.collection('users')
        .doc(comment.userId)
        .get()
        .then(doc => {
            const newComment = {
                displayName: doc.data().username,
                profilePic: doc.data().profilePic,
                comment: comment.comment,
                timestamp: comment.timestamp,
                postId: comment.postId
            }
            db.collection('comments')
                .add(newComment)
                .then(doc => {

                    dispatch(createNotification(newComment.postId, comment.userId, 'comment'))
                }).catch(err => {
                    console.log(err);

                })
        })

}

export const getComments = () => dispatch => {
    db.collection('comments')
        .orderBy('timestamp', 'desc')
        .onSnapshot(snapshot => {
            let comments = []
            snapshot.forEach(doc => {
                comments.push({
                    id: doc.id,
                    comment: doc.data().comment,
                    postId: doc.data().postId,
                    displayName: doc.data().displayName,
                    profilePic: doc.data().profilePic,
                    timestamp: doc.data().timestamp
                })
            })
            dispatch({
                type: GET_COMMENTS,
                payload: comments
            })
        })
}