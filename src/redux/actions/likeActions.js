import db from '../../firebase'
import { GET_LIKES, CREATE_LIKE, UNLIKE_POST } from './types'
import { createNotification } from './NotificationActions'

export const likePost = (id) => dispatch => {
    db.collection('likes')
        .where('userId', '==', localStorage.userId)
        .where('postId', '==', id)
        .get()
        .then(data => {
            if (data.empty) {
                const newLike = {
                    userId: localStorage.userId,
                    postId: id,
                }
                db.collection('posts')
                    .doc(id)
                    .get()
                    .then(doc => {
                        newLike.likeCount = doc.data().likeCount
                        db.collection('likes')
                            .add(newLike)
                            .then(doc => {
                                newLike.likeCount++
                                db.collection('posts')
                                    .doc(newLike.postId)
                                    .update({ likeCount: newLike.likeCount })
                                    .then(doc => {
                                        dispatch({
                                            type: CREATE_LIKE,
                                            payload: newLike
                                        })
                                        dispatch(createNotification(id, localStorage.userId, 'like'))
                                    })
                            })
                    })

            } else {
                console.log('you already liked this post');
            }
        })

}

export const getLikes = () => dispatch => {
    db.collection('likes')
        .onSnapshot(snapshot => {
            let likes = []
            snapshot.forEach(doc => {
                likes.push({
                    id: doc.id,
                    postId: doc.data().postId,
                    userId: doc.data().userId
                })
            })
            dispatch({
                type: GET_LIKES,
                payload: likes
            })
        })

}

export const unlikePost = (postId) => dispatch => {
    db.collection('likes')
        .where('postId', '==', postId)
        .where('userId', '==', localStorage.userId)
        .limit(1)
        .get()
        .then(data => {
            let newLike = {
                likeCount: 0,
                postId: postId
            }
            db.collection('posts')
                .doc(postId)
                .get()
                .then(doc => {
                    newLike.likeCount = doc.data().likeCount
                    data.docs.forEach(doc => {
                        db.collection('likes')
                            .doc(doc.id)
                            .delete()
                            .then(doc => {
                                newLike.likeCount--
                                db.collection('posts')
                                    .doc(postId)
                                    .update({ likeCount: newLike.likeCount })
                                    .then(doc => {
                                        console.log('unliked suceesfull');
                                        dispatch({
                                            type: UNLIKE_POST,
                                            payload: newLike
                                        })

                                    })
                            }).catch(err => {
                                console.log(err)
                            })
                    })
                })



        })

}
