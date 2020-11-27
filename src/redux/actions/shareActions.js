import db from '../../firebase'
import moment from 'moment'
import { GET_SHARED_POSTS, CREATE_SHARED_POST } from './types'
import { createNotification } from './NotificationActions'

export const sharePost = (post) => dispatch => {
    if (localStorage.userId === post.userId) {
        db.collection('shares')
            .where('userId', '==', localStorage.userId)
            .where('postId', '==', post.id)
            .get()
            .then(doc => {
                console.log(doc);
                if (doc.empty) {
                    const sharedPost = {
                        parentId: post.userId,
                        postId: post.id,
                        userId: localStorage.userId,
                        timestamp: moment().toISOString()
                    }
                    db.collection('shares')
                        .add(sharedPost)
                        .then(doc => {
                            console.log('shared post is sucessfull');
                            dispatch({
                                type: CREATE_SHARED_POST,
                                payload: sharedPost
                            })
                            dispatch(createNotification(sharedPost.postId, localStorage.userId, 'share'))

                        })
                } else {
                    console.log('already shared post');
                }

            }).catch(err => {
                console.log(err);

            })
    } else {
        console.log('you cant share your own post');

    }



}

export const getSharedPosts = (id) => dispatch => {
    db.collection('shares')
        .orderBy('timestamp', 'desc')
        .where('userId', '==', id)
        .get()
        .then(snapshot => {

            let sharedPosts = []
            snapshot.docs.forEach(doc => {
                db.collection('posts')
                    .doc(doc.data().postId)
                    .get()
                    .then(data => {

                        sharedPosts.push({
                            id: data.id,
                            profilePic: data.data().profilePic,
                            image: data.data().image,
                            username: data.data().username,
                            timestamp: data.data().timestamp,
                            message: data.data().message,
                            userId: data.data().userId,
                            likeCount: data.data().likeCount
                        })
                        dispatch({
                            type: GET_SHARED_POSTS,
                            payload: sharedPosts
                        })

                    })
            })

        })
}