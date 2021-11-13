import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { BiExit, BiHome } from 'react-icons/bi';
import './Topbar.css'
import { useHistory } from 'react-router-dom';

const Topbar = () => {
    const history = useHistory()
    const authUser = useSelector(({ auth }) => auth.authUser);

    const logOut = () => {
        localStorage.removeItem("token")
        window.location.reload()
    }

    return (
        <div className="topbar-container">
            <div className="topbar">
                <BiHome className="topbar-icon" onClick={() => history.push('../sample')} />

                <div className="topbar-text-container">
                    <h1>{authUser.name}</h1>
                    <p>{authUser.user_type.user_type}</p>
                </div>

                <BiExit className="topbar-icon" onClick={() => logOut()} />
            </div>

        </div>
    )
}

export default Topbar
