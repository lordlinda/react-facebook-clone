import React from 'react'
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import { IconButton } from '@material-ui/core';
import { likePost, unlikePost, getLikes } from '../redux/actions/likeActions'
import { connect } from 'react-redux'

function LikeButton(props) {
    const { likes, id } = props

    const isLikedPost = () => {
        if (likes.filter(like => like.userId === localStorage.userId).find(like => like.postId === id)) {
            return true
        } else {
            return false
        }

    }
    const likePost = () => {
        props.likePost(id)
    }
    const unlikePost = () => {
        props.unlikePost(id)
    }



    return (
        <div>
            {
                isLikedPost() ?
                    <IconButton onClick={unlikePost}>
                        <ThumbUpIcon fontSize='small' color='primary' />
                    </IconButton>
                    :
                    <IconButton onClick={likePost}>
                        <ThumbUpIcon fontSize='small' />
                    </IconButton>
            }

        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        likes: state.user.likes
    }
}

export default connect(mapStateToProps, { likePost, unlikePost, getLikes })(LikeButton)
