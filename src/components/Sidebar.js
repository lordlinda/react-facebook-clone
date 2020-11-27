import React from 'react'
import './Sidebar.css'
import SidebarRow from './SidebarRow'
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import EmojiFlagsIcon from '@material-ui/icons/EmojiFlags';
import PeopleIcon from '@material-ui/icons/People';
import ChatIcon from '@material-ui/icons/Chat';
import StorefrontIcon from '@material-ui/icons/Storefront';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';
import { connect } from 'react-redux'

function Sidebar(props) {
    const { user, loading } = props
    return (
        <div className='sidebar'>

            {
                !loading ?
                    <SidebarRow title={user.displayName} src={user.photoURL} />
                    : <p>loading...</p>
            }


            <SidebarRow
                Icon={LocalHospitalIcon}
                title='Covid-19 Info Center' />
            <SidebarRow Icon={EmojiFlagsIcon} title='Pages' />
            <SidebarRow title='Friends'
                Icon={PeopleIcon} />
            <SidebarRow title='Messenger'
                Icon={ChatIcon} />

            <SidebarRow title='MarketPlace'
                Icon={StorefrontIcon} />

            <SidebarRow title='Videos'
                Icon={VideoLibraryIcon} />
            <SidebarRow title='MarketPlace'
                Icon={ExpandMoreOutlinedIcon} />

        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        user: state.user.user,
        loading: state.user.loading
    }
}
export default connect(mapStateToProps)(Sidebar)

