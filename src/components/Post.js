import React, { useState, useEffect } from 'react'
import { Avatar, Divider, IconButton } from '@material-ui/core'
import './Post.css'
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import moment from 'moment'
import { Link } from 'react-router-dom';
import Comments from './Comments';
import { connect } from 'react-redux'
import { sharePost } from '../redux/actions/shareActions'
import LikeButton from './LikeButton';
import { getLikes } from '../redux/actions/likeActions'
const Post = (props) => {
    const [expanded, setExpanded] = useState(false);
    const [comments, setComments] = useState([])

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const { profilePic, image, username, timestamp, message, userId, id, likeCount } = props.post
    useEffect(() => {
        setComments(props.comments.filter(comment => comment.postId === id));

    }, [props.comments.length, likeCount, props.likes.length])

    const sharePost = () => {
        props.sharePost(props.post)
    }

    return (
        <div className='post' >

            <Card>
                <CardHeader
                    avatar={
                        <Avatar src={profilePic} className='post__avatar' />
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={
                        <Link to={`/${userId}`}>{username}</Link>
                    }
                    subheader={moment(timestamp).format('MMMM YY')}
                >

                </CardHeader>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {message}
                    </Typography>
                </CardContent>
                {
                    image ?
                        <CardMedia
                            className='post__image'
                            image={image}
                            style={{
                                height: 0,
                                paddingTop: '56.25%',
                                width: '100%'
                            }}

                        />
                        : null
                }

                <Divider light />
                <div className='post__info'>

                    <p>{`${likeCount} likes`}</p>

                    {
                        comments ?
                            <p>{`${comments?.length} comments`}</p>
                            : null
                    }

                </div>
                <Divider light />
                <CardActions disableSpacing>
                    <div aria-label="like" className='post__option'>
                        <LikeButton id={id} />
                    </div>
                    <div className='post__option'>
                        <IconButton onClick={handleExpandClick}>
                            <ChatBubbleOutlineIcon fontSize='small' />
                        </IconButton>
                    </div>
                    <div aria-label="share" className='post__option'>
                        <IconButton onClick={sharePost}>
                            <ShareIcon fontSize='small' />
                        </IconButton>
                    </div>
                </CardActions>
                <Comments
                    comments={comments}
                    userId={userId}
                    postId={id}
                    expanded={expanded}
                />

            </Card>



        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        comments: state.post.comments,
        likes: state.user.likes,
    }
}

export default connect(mapStateToProps, { sharePost, getLikes })(Post)
