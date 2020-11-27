import { Avatar } from '@material-ui/core'
import React, { } from 'react'
import moment from 'moment'
import './Comment.css'
function Comment(props) {
    const { profilePic, displayName, comment, timestamp } = props.comment

    return (
        <div className='comment'>
            <Avatar src={profilePic} />
            <div className='comment__info'>
                <p className='comment__name'> {displayName}</p>
                <p className='comment__message'>{comment}</p>
                <p className='comment__time'>{moment(timestamp).format('YYYY MMM DD')}</p>
            </div>
        </div>
    )
}

export default Comment
