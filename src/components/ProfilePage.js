import { Avatar, Box, Card, CardContent, Dialog, DialogContent, DialogTitle, Grid, IconButton, Tooltip } from '@material-ui/core'
import PhoneIcon from '@material-ui/icons/Phone';
import InfoIcon from '@material-ui/icons/Info';
import LinkIcon from '@material-ui/icons/Link';
import FlagIcon from '@material-ui/icons/Flag';
import React, { useState, useEffect } from 'react'
import './Profile.css'
import { connect } from 'react-redux'
import moment from 'moment';
import EditIcon from '@material-ui/icons/Edit';
import { imageProfileUpload, coverPhotoUpload, getUserProfile, editUserDetails, getUserData } from '../redux/actions/UserActions'
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import Input from './Reusables/Input'
import { getSharedPosts } from '../redux/actions/shareActions'
import { getPosts } from '../redux/actions/PostsActions'
import Post from './Post';
import Skeleton from '@material-ui/lab/Skeleton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';

function ProfilePage(props) {
    const [profilePic, updateProfilePic] = useState('')
    const [open, toggleOpen] = useState(false)
    const [userPosts, setUserPosts] = useState([])
    const [sharedPosts, setSharedPosts] = useState([])
    const [formData, setFormData] = useState({
        description: '',
        link: '',
        phoneNumber: '',
        relationshipStatus: '',
        hometown: '',
    })

    const { description, relationshipStatus, link, phoneNumber, hometown } = formData

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })

    }

    const handleClose = () => {
        toggleOpen(!open)
    }
    const handleImageUpload = e => {
        if (e.target.files[0]) {
            updateProfilePic(e.target.files[0])
            props.imageProfileUpload(e.target.files[0])
        }
    }
    const coverPhotoUpload = e => {
        if (e.target.files[0]) {
            props.coverPhotoUpload(e.target.files[0])
        }
    }
    const handleEditPicture = () => {
        const fileInput = document.querySelector('#coverPhotoUpload')
        fileInput.click()
    }
    const editProfileImage = () => {
        const fileInput = document.querySelector('#profileClick')
        fileInput.click()
    }

    const { user, loading, isPostsLoading } = props
    useEffect(() => {
        props.getUserProfile(props.match.params.user)
        props.getSharedPosts(props.match.params.user)
        props.getPosts()
        setFormData({
            ...formData,
            description: user?.description,
            link: user?.link,
            phoneNumber: user?.phoneNumber,
            relationshipStatus: user?.relationshipStatus,
            hometown: user?.hometown,
        })

        setUserPosts(props.posts.filter(post => post.userId === props.match.params.user));
        setSharedPosts(props.sharedPosts)

    }, [props.posts.length, props.sharedPosts.length, user?.description, user?.link, user?.relationshipStatus, user?.hometown, user?.phoneNumber, user?.profilePic, user?.coverPhoto])

    const handleSubmit = (e) => {
        e.preventDefault()
        props.editUserDetails(formData)
        toggleOpen(false)
    }

    return (
        <div className='profile'>
            <div className='profile__coverContainer'>
                {
                    user?.coverPhoto ?
                        <>
                            <div className='profile__coverPhoto'>
                                <img src={user?.coverPhoto} alt='' />
                            </div>
                        </>
                        : <img src='https://images.unsplash.com/photo-1550001476-628d3290d7e9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60' alt='' className='profile__defaultImage' />
                }
                {
                    user?.id === localStorage.userId ?
                        <Tooltip placement='bottom' title='edit cover photo'>
                            <IconButton onClick={handleEditPicture}
                                className='profile__icon'
                            >  <CameraAltIcon fontSize='small' />
                                <input type='file'
                                    className='profile__imageInput'
                                    id='coverPhotoUpload'
                                    onChange={coverPhotoUpload} />

                            </IconButton>
                        </Tooltip>
                        : null
                }

            </div>
            <div className='profile__image'>
                <>
                    <Avatar src={user?.profilePic} />
                    {
                        user?.id === localStorage.userId ?
                            <Tooltip placement='bottom' title='edit profile picture'>
                                <IconButton onClick={editProfileImage}>
                                    <CameraAltIcon fontSize='small' />
                                    <input type='file'
                                        id='profileClick'
                                        className='profile__imageInput'
                                        onChange={handleImageUpload} />
                                </IconButton>
                            </Tooltip>
                            : null
                    }
                </>
            </div>
            <div className='profile__menu'>
                <p>Home</p>
                <p>Groups</p>
                <p>Live</p>
                <p>Youtube</p>
                <p>More</p>

            </div>
            <div className='profile__bottom'>
                {
                    loading ?
                        <Grid container wrap="nowrap">
                            <Box width={210} marginRight={0.5} my={5}>
                                <Skeleton variant="rect" width={210} height={118} />
                                <Box pt={0.5}>
                                    <Skeleton />
                                    <Skeleton width="60%" />
                                </Box>
                            </Box>

                        </Grid> :
                        (
                            <div className='profile__bio'>
                                <Card variant="outlined">
                                    <CardContent>
                                        <div>
                                            <div className='profile__option'>
                                                <InfoIcon color='primary' />
                                                <p>About</p>
                                            </div>

                                            <p className='profile__description'>{description}</p>
                                            {
                                                user?.link ?
                                                    <div className='profile__option'>
                                                        <LinkIcon color='primary' />
                                                        <a href={user.link}
                                                            target='_blank'>{user.link}</a>
                                                    </div>
                                                    : null
                                            }
                                            {
                                                user?.phoneNumber ?
                                                    <div className='profile__option'>
                                                        <PhoneIcon color='primary' />
                                                        <p>{user.phoneNumber}</p>
                                                    </div>
                                                    : null
                                            }

                                            {
                                                user?.timestamp ?
                                                    <div className='profile__option'>
                                                        <FlagIcon color='primary' />
                                                        <p>{moment(user.timestamp).format('YYYY MMMM DD')}</p>
                                                    </div>
                                                    : null
                                            }
                                            {
                                                user?.relationshipStatus ?
                                                    <div className='profile__option'>
                                                        <FavoriteIcon color='primary' />
                                                        <p>{user.relationshipStatus}</p>
                                                    </div>
                                                    : null
                                            }
                                            {
                                                user?.hometown ?
                                                    <div className='profile__option'>
                                                        <LocationOnIcon color='primary' />
                                                        <p>{user.hometown}</p>
                                                    </div>
                                                    : null
                                            }

                                        </div>
                                        <div>
                                            {
                                                user?.id === localStorage.userId ?
                                                    <IconButton onClick={handleClose}>
                                                        <EditIcon />
                                                    </IconButton>
                                                    : null
                                            }

                                            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                                                <DialogTitle id="customized-dialog-title" onClose={handleClose}>

                                                    Edit profile
                                            </DialogTitle>
                                                <DialogContent dividers>
                                                    <form onSubmit={handleSubmit}>
                                                        <Input
                                                            type='text'
                                                            onChange={handleChange}
                                                            value={description}
                                                            name='description'
                                                        />
                                                        <Input
                                                            type='text'
                                                            onChange={handleChange}
                                                            value={link}
                                                            name='link'
                                                        />
                                                        <Input
                                                            type='text'
                                                            onChange={handleChange}
                                                            value={phoneNumber}
                                                            name='phoneNumber'
                                                        />
                                                        <Input
                                                            type='text'
                                                            onChange={handleChange}
                                                            value={hometown}
                                                            name='hometown'
                                                        />
                                                        <Input
                                                            type='text'
                                                            onChange={handleChange}
                                                            value={relationshipStatus}
                                                            name='relationshipStatus'
                                                        />
                                                        <button >
                                                            edit
        </button>
                                                    </form>

                                                </DialogContent>

                                            </Dialog>
                                        </div>
                                    </CardContent>

                                </Card>
                            </div>
                        )
                }

                {isPostsLoading ?
                    <Grid container wrap="nowrap">
                        <Box width={210} marginRight={0.5} my={5}>
                            <Skeleton variant="rect" width={210} height={118} />
                            <Box pt={0.5}>
                                <Skeleton />
                                <Skeleton width="60%" />
                            </Box>
                        </Box>

                    </Grid>
                    : (
                        <div className='profile__posts'>
                            {
                                userPosts ?
                                    (
                                        userPosts.map(post => {
                                            return <Post post={post} key={post.id} />
                                        })
                                    )
                                    : <p>Lets start posting</p>
                            }

                            {
                                sharedPosts ?
                                    (


                                        sharedPosts.map(post => {
                                            return <Post post={post} key={post.id} />
                                        })


                                    )
                                    : null
                            }
                        </div>
                    )}

            </div>

        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        user: state.user.profile,
        sharedPosts: state.user.sharedPosts,
        posts: state.post.posts,
        loading: state.user.loading,
        isPostsLoading: state.post.loading
    }
}

export default connect(mapStateToProps, { imageProfileUpload, coverPhotoUpload, getUserProfile, editUserDetails, getSharedPosts, getPosts, getUserData })(ProfilePage)
