import { SET_USER, LOGIN_USER, SET_UNAUTHENTICATED, LOADING_UI, SET_USER_PROFILE } from './types'
import { auth, provider, storage } from '../../firebase'
import db from '../../firebase'
import moment from 'moment'

export const signIn = () => dispatch => {
    auth.signInWithPopup(provider)
        .then(result => {
            dispatch({
                type: LOGIN_USER,
                payload: result.user
            })
            localStorage.setItem('photoURL', result.user.photoURL)
            localStorage.setItem('displayName', result.user.displayName)
            localStorage.setItem('token', result.credential.idToken)
            localStorage.setItem('userId', result.user.uid)
            dispatch(createUser(result.user))
        }).catch(error => {
            console.log(error)
            alert(error.msg)
        })
}

export const getUserData = () => dispatch => {
    dispatch({ type: LOADING_UI })
    db.collection('users')
        .doc(localStorage.userId)
        .onSnapshot(doc => {
            let signedInUser = {};
            signedInUser = doc.data();
            signedInUser.id = doc.id;
            dispatch({
                type: SET_USER,
                payload: signedInUser
            })
        })
}

export const getUserProfile = (id) => dispatch => {
    dispatch({ type: LOADING_UI })
    db.collection('users')
        .doc(id)
        .onSnapshot(doc => {
            let profileUser = {};
            profileUser = doc.data();
            profileUser.id = doc.id;
            dispatch({
                type: SET_USER_PROFILE,
                payload: profileUser
            })
        })
}

export const createUser = (userDetails) => dispatch => {

    //1.we check and ensure a user with this email address
    db.collection('users')
        .where('email', '==', userDetails.email)
        .get()
        //2 if exists we let them through and get their data
        .then(docs => {
            if (!docs.empty) {
                docs.forEach(doc => {
                    console.log(doc.data());
                    const alreadyUser = doc.data()
                    alreadyUser.id = doc.id
                    dispatch({
                        type: SET_USER,
                        payload: alreadyUser
                    })
                    localStorage.setItem('userId', alreadyUser.id)
                })


            } else {
                const newUser = {
                    email: userDetails.email,
                    username: userDetails.displayName,
                    profilePic: userDetails.photoURL,
                    coverPhoto: '',
                    relationshipStatus: '',
                    hometown: '',
                    timestamp: moment().toISOString()
                }
                //3 if not we create a new user for them and get their new data
                db.collection('users')
                    .add(newUser)
                    .then(docs => {
                        const user = newUser
                        user.id = docs.id
                        dispatch({
                            type: SET_USER,
                            payload: user
                        })
                        localStorage.setItem('userId', user.id)
                    }).catch(err => {
                        console.log(err);

                    })
            }

        }).catch(err => {
            console.log(err)
        })


}

export const logOut = () => dispatch => {
    dispatch({
        type: SET_UNAUTHENTICATED
    })
    localStorage.removeItem('token')
    localStorage.removeItem('displayName')
    localStorage.removeItem('photoURL')
    localStorage.removeItem('userId')

}

export const imageProfileUpload = (image) => dispatch => {
    const uploadTask = storage.ref(`/images/${image.name}`).put(image)
    uploadTask.on('state_changed',
        (snapshot) => {

        },
        (error) => {
            console.log(error);

        },
        () => {
            storage.ref('images').child(image.name).getDownloadURL()
                .then(url => {
                    db.collection('users')
                        .doc(localStorage.userId)
                        .update({
                            profilePic: url
                        })

                })
        })

}

export const coverPhotoUpload = (image) => dispatch => {
    const uploadTask = storage.ref(`/images/${image.name}`).put(image)
    uploadTask.on('state_changed',
        (snapshot) => {

        },
        (error) => {
            console.log(error);

        },
        () => {
            storage.ref('images').child(image.name).getDownloadURL()
                .then(url => {
                    console.log(url);
                    db.collection('users')
                        .doc(localStorage.userId)
                        .update({
                            coverPhoto: url
                        })

                })
        })

}

export const editUserDetails = (userDetails) => dispatch => {
    db.collection('users')
        .doc(localStorage.userId)
        .update(userDetails)
        .then(docs => {

        }).catch(err => {
            console.log(err);

        })
}

