import React, { useState, useEffect } from 'react'
import './Feed.css'
import MessageSender from './MessageSender'
import Post from './Post'
import StoryReel from './StoryReel'
import { connect } from 'react-redux'
import { getPosts } from '../redux/actions/PostsActions'
import { getComments } from '../redux/actions/CommentsActions'
import { getLikes } from '../redux/actions/likeActions'
import { Box, Grid } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton';

const Feed = (props) => {
    const { loading } = props
    const [posts, setPosts] = useState([])
    useEffect(() => {
        props.getPosts()
        props.getComments()
        props.getLikes()
        setPosts(props.posts)

    }, [props.posts.length, props.likes.length])

    return (
        <div className='feed'>
            {/**strory reel */}
            <StoryReel />
            {/**message sender */}
            <MessageSender />
            {
                !loading ?
                    posts && posts.length > 0 ?
                        posts.map(post => {
                            return <Post post={post} key={post.id} />
                        })
                        : <p>Lets start posting</p>
                    :
                    <Grid container wrap="nowrap">
                        <Box width={210} marginLeft={1.5} my={5}>
                            <Skeleton variant="rect" width={210} height={118} />
                            <Box pt={0.5}>
                                <Skeleton />
                                <Skeleton width="60%" />
                            </Box>
                        </Box>

                    </Grid>
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        posts: state.post.posts,
        loading: state.post.loading,
        likes: state.user.likes
    }
}
export default connect(mapStateToProps, { getPosts, getComments, getLikes })(Feed)
