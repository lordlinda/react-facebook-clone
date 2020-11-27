import { Avatar, Button, Collapse } from '@material-ui/core'
import React, { useState, } from 'react'
import './Comments.css'
import moment from 'moment'
import { connect } from 'react-redux'
import { commentOnPost } from '../redux/actions/CommentsActions'
import Comment from './Comment'

function Comments(props) {
    const { expanded, postId, profilePic, comments } = props

    const [comment, setComment] = useState('')

    const handleChange = (e) => {
        setComment(e.target.value)
    }
    const handleComment = (e) => {
        e.preventDefault()
        const data = {
            postId,
            userId: localStorage.userId,
            timestamp: moment().toISOString(),
            comment
        }

        props.commentOnPost(data)
        setComment('')

    }

    return (
        <div className='comments'>
            <Collapse in={expanded} timeout='auto'>
                <form
                    className='comments__form'
                >
                    <Avatar src={profilePic} />
                    <input
                        type='text'
                        value={comment}
                        onChange={handleChange}
                        placeholder='write a comment'
                    />
                    <Button onClick={handleComment} type='submit'>comment</Button>
                </form>
                {
                    comments ?
                        comments.map(comment => {
                            return <Comment comment={comment} key={comment.id} />
                        })
                        : null
                }

            </Collapse>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        profilePic: state.user.user?.profilePic
    }
}

export default connect(mapStateToProps, { commentOnPost })(Comments)
