import { Badge, Dialog, DialogContent, IconButton } from '@material-ui/core'
import React, { useState } from 'react'
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import './Header.css'
import Notification from './Notification'

function Notifications(props) {
    const { notifications } = props
    const [open, toggleOpen] = useState(false)

    const handleClose = () => {
        toggleOpen(!open)
    }

    return (
        <div>
            <IconButton onClick={handleClose}>
                <Badge badgeContent={notifications.length} color="primary">
                    <NotificationsActiveIcon />
                </Badge>

            </IconButton>
            <Dialog onClose={handleClose}
                className='header__dialog'
                aria-labelledby="customized-dialog-title" open={open}>
                <DialogContent dividers>

                    {notifications.length > 0 ?
                        notifications.map(notification => {
                            return <Notification key={notification.id}
                                notification={notification}
                            />
                        })
                        : <p>You have no notifications</p>
                    }

                </DialogContent>

            </Dialog>
        </div>
    )
}

export default Notifications
