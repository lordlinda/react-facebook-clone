import React, { useState } from 'react'
import { Avatar } from '@material-ui/core'
import './MessageSender.css'
import VideocamIcon from '@material-ui/icons/Videocam';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import { connect } from 'react-redux'
import { createPost } from '../redux/actions/PostsActions'

function MessageSender(props) {
    const { user, loading } = props
    const [inputData, setInput] = useState({
        imageUrl: '',
        input: ''
    })
    const handleInput = (e) => {
        setInput({
            ...inputData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setInput({
            ...inputData,
            imageUrl: '',
            input: ''
        })
        const data = {
            ...inputData,
            profilePic: user.profilePic
        }

        props.createPost(data)

    }

    const { input, imageUrl } = inputData
    return (
        <div className='messageSender'>
            <div className='messageSender__top'>
                {!loading ?
                    <Avatar src={user.profilePic} />
                    :
                    <Avatar />
                }

                <form onSubmit={handleSubmit}>
                    <input type='text'
                        name='input'
                        placeholder='whats in your spirit'
                        value={input}
                        onChange={handleInput} />
                    <input
                        name='imageUrl'
                        value={imageUrl} placeholder='imageurl (optional)' onChange={handleInput} />
                    <button type='submit'>Post</button>
                </form>
            </div>
            <div className='messageSender__bottom'>
                <div className='messageSender__option'>
                    <VideocamIcon style={{ color: 'red' }} />
                    <h3>live video</h3>
                </div>
                <div className='messageSender__option'>
                    <PhotoLibraryIcon style={{ color: 'green' }} />
                    <h3>Photo video</h3>
                </div>
                <div className='messageSender__option feeling__option'>
                    <InsertEmoticonIcon style={{ color: 'orange' }} />
                    <h3>Feeling/Activity</h3>
                </div>
            </div>

        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        user: state.user.user,
        loading: state.user.loading,
    }
}
export default connect(mapStateToProps, { createPost })(MessageSender)
