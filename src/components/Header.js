import React, { useState, useEffect } from 'react'
import './Header.css'
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import FlagIcon from '@material-ui/icons/Flag';
import SubscriptionsOutlinedIcon from '@material-ui/icons/SubscriptionsOutlined';
import StorefrontOutlinedIcon from '@material-ui/icons/StorefrontOutlined';
import SupervisedUserCircleOutlinedIcon from '@material-ui/icons/SupervisedUserCircleOutlined';
import ForumIcon from '@material-ui/icons/Forum';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import { Avatar, Dialog, DialogContent, IconButton, Tooltip } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { connect } from 'react-redux'
import { logOut } from '../redux/actions/UserActions'
import { getNotifications } from '../redux/actions/NotificationActions'
import { Link } from 'react-router-dom';
import Notifications from './Notifications'

function Header(props) {
    const { user, loading } = props
    const [open, toggleOpen] = useState(false)
    const [unreadNotifications, setUnReadNotifications] = useState([])
    const handleClose = () => {
        toggleOpen(!open)
    }
    const signOut = () => {
        console.log('button clicked');

        props.logOut()
    }
    useEffect(() => {
        props.getNotifications()
        setUnReadNotifications(props.notifications.filter(notification => notification.read === false))
    }, [props.notifications.length])

    return (
        <div className='header'>
            <div className='header__left'>
                <img src='' alt='' />
                <div className='header__input'>
                    <SearchIcon />
                    <input type='text' placeholder='search facebook' />
                </div>
            </div>
            <div className='header__middle'>
                <div className='header__option header__option--active'>
                    <HomeIcon fontSize='large' />
                </div>
                <div className='header__option'>
                    <FlagIcon fontSize='large' />
                </div>
                <div className='header__option'>
                    <SubscriptionsOutlinedIcon fontSize='large' />
                </div>
                <div className='header__option'>
                    <StorefrontOutlinedIcon fontSize='large' />
                </div>
                <div className='header__option'>
                    <SupervisedUserCircleOutlinedIcon fontSize='large' />
                </div>
            </div>
            <div className='header__right'>
                <div className='header__info'>
                    {
                        !loading ?
                            <>
                                <Link to='/'>
                                    <Avatar src={user?.profilePic} />
                                </Link>

                                <h4>{user?.username}</h4>
                            </>
                            : <Avatar />
                    }

                </div>
                <IconButton>
                    <Tooltip title="Add" aria-label="add" placement='bottom'>
                        <AddIcon />
                    </Tooltip>
                </IconButton>
                <IconButton>
                    <Tooltip title="messenger" aria-label="add" placement='bottom'>
                        <ForumIcon />
                    </Tooltip>
                </IconButton>
                <Notifications notifications={unreadNotifications} />

                <IconButton onClick={handleClose}>
                    <Tooltip placement='bottom' title='Account'>
                        <ExpandMoreIcon />
                    </Tooltip>

                </IconButton>
                <Dialog onClose={handleClose}
                    className='header__dialog'
                    aria-labelledby="customized-dialog-title" open={open}>
                    <DialogContent dividers>

                        <div className='header__option'>
                            <Avatar />
                            <Link to={`/${localStorage.userId}`}>
                                <p>See your profile</p>
                            </Link>

                        </div>
                        <div className='header__option'>
                            <p>Logout</p>
                            <IconButton onClick={signOut}>
                                <ExitToAppIcon />
                            </IconButton>

                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.user.user,
        loading: state.user.loading,
        notifications: state.user.notifications
    }
}
export default connect(mapStateToProps, { logOut, getNotifications })(Header)
