import React, { useEffect, useState } from 'react'
import Logo from '../../assets/2local logo wht.svg'
import Toggler from '../../assets/Group 7942.svg'
import './Navbar.css'
import { NavLink } from 'react-router-dom'
import Dropdown from './Dropdown'
import NavigatorMobile from './NavigatorMobile'
import { useUser } from '../../hook/Context/UserContext'
import { useWallet } from 'use-wallet'
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import deepOrange from '@material-ui/core/colors/deepOrange';
import deepPurple from '@material-ui/core/colors/deepPurple';

const SERVER_URL = process.env.REACT_APP_SERVER_ADDRESS

const userStyles = makeStyles({
    avatar: {
        margin: 10,
    },
    orangeAvatar: {
        margin: 10,
        color: '#fff',
        backgroundColor: deepOrange[500],
    },
    purpleAvatar: {
        margin: 10,
        color: '#fff',
        backgroundColor: deepPurple[500],
    },
    profileRight : {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
})

function Navbar({ setisOpen, isOpen, open, setopen, modal, setModal }) {
    const classes = userStyles()
    const wallet = useWallet()
    const path = typeof window !== undefined && window.location.pathname
    console.log('history', window.location.pathname)

    const { user, storeUser } = useUser()
    const [profile_image, setProfileImg] = useState('')

    useEffect(() => {
        setProfileImg(
            user.profile_image
                ? SERVER_URL + user.profile_image
                : GetAvartarFromName(user.full_name)
        )
    }, [user.full_name, user.profile_image])

    const GetAvartarFromName = (name) => {
        var name = name.trim()
        var res =
            'https://eu.ui-avatars.com/api/?name=' +
            name +
            '&background=edf6fd&color=53A8F0&font-size=0.33&bold=true&size=56'
        return res
    }

    const getAccountEllipsis = () => {
        if (wallet.account) {
            return (
                wallet.account.substring(0, 4) +
                ' ... ' +
                wallet.account.substring(wallet.account.length - 4)
            )
        } else {
            return 'Connect Wallet'
        }
    }

    return (
        <div className="navbar-container">
            <nav class="navbar navbar-expand-lg navbar-light d-flex pt-3 pb-3 ">
                <div className="inner-nav d-flex align-items-center">
                    <img
                        onClick={() => setisOpen(!isOpen)}
                        className="mr-2 brand"
                        src={Toggler}
                        width="50px"
                        alt=""
                    />

                    <NavLink className="nav-link" to="/">
                        <img className="brand-logo" src={Logo} alt="" width="90px" />
                    </NavLink>
                </div>

                <div className="navbarText">
                    <ul class="navbar-nav mr-auto ">
                        <li class={`nav-item font-weight-bold mr-2 ${path === '/exchange' && 'active'}`}>
                            <NavLink className="nav-link" to="/exchange">Exchange</NavLink>
                        </li>
                        <li class={`nav-item font-weight-bold mr-2 ${path === '/launch-pool' && 'active'}`}>
                            <NavLink className="nav-link" to="/launch-pool">Launch Pool</NavLink>
                        </li>
                        <li class={`nav-item font-weight-bold mr-2 ${path === '/yield-farming' && 'active'}`}>
                            <NavLink className="nav-link" to="/yield-farming">Yield Farming</NavLink>
                        </li>
                        <li class={`nav-item font-weight-bold mr-2 ${path === '/airdrops' && 'active'}`}>
                            <NavLink className="nav-link" to="/airdrops">Airdrops</NavLink>
                        </li>
                        <li class={`nav-item font-weight-bold mr-2 ${path === '/address-book' && 'active'}`}>
                            <NavLink className="nav-link" to="/address-book">Address Book</NavLink>
                        </li>
                    </ul>
                </div>

                <div className="d-flex align-items-center nav-right">
                    <div className="text-left mx-xs-3 d-flex">
                        <button className="mr-sm-4 connect-wallet-btn" onClick={() => {
                                setModal(5)
                                setopen(false)
                            }}
                        >
                            {getAccountEllipsis()}
                        </button>
                        <div className={classes.profileRight}>
                            <Avatar src={profile_image}></Avatar>
                            <span className="m-2 mb-1 font-weight-bold profile">
                                {user.full_name}
                            </span>
                            <i
                                onClick={() => {
                                    setopen(!open)
                                }}
                                style={{
                                    transform: open ? 'scale(1.5) rotate(180deg)' : '',
                                }}
                                class="ml-1 fas fa-caret-down caret-color"
                            ></i>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="topbar-navigator-mobile ">
                <NavigatorMobile />
            </div>
            {open && <Dropdown setopen={setopen} />}
        </div>
    )
}

export default Navbar
