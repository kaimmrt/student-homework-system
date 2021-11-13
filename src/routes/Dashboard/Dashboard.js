import React from 'react'
import { MdPeople } from 'react-icons/md';
import { SiGoogleclassroom } from 'react-icons/si';
import { FaChild, FaHistory } from 'react-icons/fa';
import { GiNotebook } from 'react-icons/gi';
import { useHistory } from 'react-router-dom';
import { useSelector } from "react-redux";

const Dashboard = () => {
    const history = useHistory()
    const authUser = useSelector(({ auth }) => auth.authUser);

    console.log(authUser)

    return (
        <div className="dashboard-container">
            {
                authUser.user_type_id == 1
                    ?
                    <div className="card-container">
                        <div className="card" onClick={() => history.push('./teacher-list')} >
                            <MdPeople className="card-icon" />
                            <p>Teacher List</p>
                        </div>
                        <div className="card" onClick={() => history.push('./student-list')} >
                            <FaChild className="card-icon" />
                            <p>Student List</p>
                        </div>
                        <div className="card" onClick={() => history.push('./classlist')}>
                            <SiGoogleclassroom className="card-icon" />
                            <p>Class List</p>
                        </div>
                    </div>
                    :
                    authUser.user_type_id == 2
                        ?
                        <div className="card-container">
                            <div className="card" onClick={() => history.push(`./my-students/${authUser.class_id}`)} >
                                <MdPeople className="card-icon" />
                                <p>My Students</p>
                            </div>
                            <div className="card" onClick={() => history.push(`./give-homework`)} >
                                <GiNotebook className="card-icon" />
                                <p>Give Homework</p>
                            </div>
                            <div className="card" onClick={() => history.push(`./previous-homework`)} >
                                <FaHistory className="card-icon" />
                                <p>Previous Homeworks</p>
                            </div>
                        </div>
                        :
                        <div className="card-container">
                            <div className="card" onClick={() => history.push('./my-homeworks')} >
                                <MdPeople className="card-icon" />
                                <p>MyHomeworks</p>
                            </div>
                        </div>
            }

        </div>
    )
}

export default Dashboard
