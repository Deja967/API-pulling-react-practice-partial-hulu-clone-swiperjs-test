import React, { useState } from 'react'
import './NavBar.css'
import SearchIcon from '@material-ui/icons/Search';
import HomeIcon from '@material-ui/icons/Home';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import LiveTvIcon from '@material-ui/icons/LiveTv';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import { WindowScroller } from 'react-virtualized'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Jumbotron from './Jumbotron';

function NavBar() {

    const [navbar, setNavBar] = useState(false)
    const changeBackground = () => {
        if (window.scrollY >= 80) {
            setNavBar(true)
        } else {
            setNavBar(false)
        }
    }

    window.addEventListener('scroll', changeBackground);

    return (
        <div className={navbar ? 'navbar active' : 'navbar'}>
            <div className="header_icons">
                <div className="header_icon header_icon--active">
                    <HomeIcon />
                    <p>Home</p>
                </div>
                <div className="header_icon">
                    <FlashOnIcon />
                    <p>Trending</p>
                </div>
                <div className="header_icon">
                    <LiveTvIcon />
                    <p>Verified</p>
                </div>
                <div className="header_icon">
                    <VideoLibraryIcon />
                    <p>Collections</p>
                </div>
                <div className="header_icon">
                    <SearchIcon />
                    <p>Search</p>
                </div>
                <div className="header_icon">
                    <PersonOutlineIcon />
                    <p>Account</p>
                </div>
                
            </div>
            <img src="E:\Coding_Dojo\MERN_Stack\hulu_clone\src\images\hulu-white.png" alt="hulu" />
        </div>
    )
}

export default NavBar
