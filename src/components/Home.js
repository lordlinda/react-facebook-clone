import React from 'react'
import Sidebar from './Sidebar';
import Feed from './Feed';
import './Home.css'
function Home() {
    return (
        <div className='home__app'>
            <Sidebar />
            <Feed />
        </div>
    )
}

export default Home
