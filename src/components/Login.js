import { Button } from '@material-ui/core'
import React from 'react'
import './Login.css'
import { signIn } from '../redux/actions/UserActions'
import { connect } from 'react-redux'
function Login(props) {
    console.log(props);

    const signIn = () => {
        props.signIn()

    }
    return (
        <div className='login'>
            <img src='https://www.logo.wine/a/logo/Facebook/Facebook-Logo.wine.svg' alt='' />
            <Button type='submit' onClick={signIn}>
                signin
            </Button>
        </div>
    )
}


export default connect(null, { signIn })(Login)
