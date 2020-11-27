import { Avatar, Card, CardContent, CardHeader, CardMedia, Dialog, DialogContent, Divider, IconButton, Typography } from '@material-ui/core';
import React, { useState, useEffect } from 'react'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import './Notification.css'
import { connect } from 'react-redux'
import { markNotificationRead } from '../redux/actions/NotificationActions'
import { getSinglePost } from '../redux/actions/PostsActions'
import { Skeleton } from '@material-ui/lab';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Link } from 'react-router-dom';
import moment from 'moment'
import { getComments } from '../redux/actions/CommentsActions'
import Comments from './Comments';
function Notification(props) {

    const { type, sender, read, id, postId } = props.notification
    const { loading, post } = props
    const [open, toggleOpen] = useState(false)
    const [comments, setComments] = useState()
    const handleClose = () => {
        toggleOpen(!open)
        if (open === false) {
            props.getSinglePost(postId)

        } else {
            props.markNotificationRead(id)
        }
    }
    useEffect(() => {
        props.getComments()
        setComments(props.comments.filter(comment => comment.postId === postId));
    }, [props.comments.length])
    return (
        <div className='notification'>
            <div>
                {

                    type === 'comment' ?

                        (<div className='notification__info' onClick={handleClose}>
                            {
                                !read ? <FiberManualRecordIcon className='notification__icon' />
                                    : null
                            }
                            <p>{sender} commented on your post</p>
                        </div>)
                        : type === 'like' ?
                            (<div className='notification__info' onClick={handleClose}>
                                {
                                    !read ? <FiberManualRecordIcon className='notification__icon' />
                                        : null
                                }
                                <p> {sender} liked your post</p>

                            </div>)
                            : type === 'share' ?
                                <div className='notification__info' onClick={handleClose}>
                                    {
                                        !read ? <FiberManualRecordIcon className='notification__icon' />
                                            : null
                                    }
                                    <p>{sender} shared your post</p></div>
                                : null
                }
            </div>
            <Divider light />
            <Dialog onClose={handleClose}
                aria-labelledby="customized-dialog-title" open={open}>
                <DialogContent dividers>
                    <Card >
                        <CardHeader
                            avatar={
                                loading ? (
                                    <Skeleton animation="wave" variant="circle" width={40} height={40} />
                                ) : (
                                        <Avatar
                                            alt="Ted talk"
                                            src={post?.profilePic}
                                        />
                                    )
                            }
                            action={
                                loading ? null : (
                                    <IconButton aria-label="settings">
                                        <MoreVertIcon />
                                    </IconButton>
                                )
                            }
                            title={
                                loading ? (
                                    <Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />
                                ) : (
                                        <Link to={`/${post.userId}`}>{post.username}</Link>
                                    )
                            }
                            subheader={loading ? <Skeleton animation="wave" height={10} width="40%" /> :
                                moment(post.timestamp).format('MMMM YY')
                            }
                        />
                        {loading ? (
                            <Skeleton animation="wave" variant="rect" />
                        ) : post.image ? (
                            <CardMedia
                                image={post.image}
                                title="Ted talk"
                                style={{ height: 190 }}
                            />
                        ) : null
                        }

                        <CardContent>
                            {loading ? (
                                <React.Fragment>
                                    <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                                    <Skeleton animation="wave" height={10} width="80%" />
                                </React.Fragment>
                            ) : (
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {
                                            post.message
                                        }
                                    </Typography>
                                )}
                            <Comments
                                expanded={true}
                                profilePic={post.profilePic}
                                userId={post.userId}
                                postId={postId}
                                comments={comments}
                            />
                        </CardContent>
                    </Card>

                </DialogContent>

            </Dialog>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        loading: state.post.loading,
        post: state.post.post,
        comments: state.post.comments
    }
}
export default connect(mapStateToProps, { markNotificationRead, getSinglePost, getComments })(Notification)
