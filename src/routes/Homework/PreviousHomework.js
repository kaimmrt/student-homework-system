import React, { useState, useEffect } from 'react'
import { post } from '../../networking/Server'
import { useHistory } from 'react-router-dom'
import { useSelector } from "react-redux";
import moment from 'moment'

const PreviousHomework = () => {
    const authUser = useSelector(({ auth }) => auth.authUser);

    const history = useHistory()
    const [data, setData] = useState([])

    const FetchPreviousHomework = () => {
        post("/api/homework/previous-homework", {
            class_id: authUser.class_id
        }).then((res) => {
            setData(res)
        })
    }

    useEffect(() => {
        FetchPreviousHomework()
    }, [])

    return (
        <div className="dashboard-container">
            <div className="list-info-header">
                <h1 className="list-header">Homework List</h1>
            </div>

            {data.map((value, index) => (
                <div className="table" key={index}>
                    <h1> {moment(value.createdAt).format('DD/MM/YYYY')}</h1>
                </div>
            ))}
        </div>
    )
}

export default PreviousHomework
