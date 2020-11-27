import db from '../../firebase'
import moment from 'moment'
import { GET_NOTIFICATIONS } from './types'

export const createNotification = (postId, userId, type) => dispatch => {
    let notification = {}
    notification.type = type
    notification.read = false
    notification.timestamp = moment().toISOString()
    db.collection('posts')
        .doc(postId)
        .get()
        .then(doc => {
            if (doc.data().userId !== localStorage.userId) {
                notification.receipient = doc.data().userId
                notification.postId = postId
                db.collection('users')
                    .doc(userId)
                    .get()
                    .then(data => {
                        console.log(data);
                        notification.sender = data.data().username
                        db.collection('notifications')
                            .add(notification)
                            .then(data => {


                            })
                    })
            }
        })


}

export const getNotifications = () => dispatch => {
    db.collection('notifications')
        .where('receipient', '==', localStorage.userId)
        .onSnapshot(data => {
            let notifications = []
            data.docs.forEach(doc => {
                notifications.push({
                    id: doc.id,
                    receipient: doc.data().receipient,
                    postId: doc.data().postId,
                    sender: doc.data().sender,
                    type: doc.data().type,
                    read: doc.data().read,
                    timestamp: doc.data().timestamp
                })

            })
            dispatch({
                type: GET_NOTIFICATIONS,
                payload: notifications
            })

        })
}

export const markNotificationRead = (id) => dispatch => {
    db.collection('notifications')
        .doc(id)
        .delete()
        .then(doc => {
            console.log(doc);


        }).catch(err => {
            console.log(err);

        })
}