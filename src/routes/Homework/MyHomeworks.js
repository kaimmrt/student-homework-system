import React, { useState, useEffect } from 'react'
import { post } from '../../networking/Server'
import { useHistory } from 'react-router-dom'
import { useSelector } from "react-redux";
import moment from 'moment'
import { AiOutlineArrowRight } from 'react-icons/ai';

const MyHomeworks = () => {
    const history = useHistory()
    const authUser = useSelector(({ auth }) => auth.authUser);
    const [data, setData] = useState([])


    const FetchMyHomeworks = () => {
        post("/api/homework/previous-homework", {
            class_id: authUser.class_id
        }).then((res) => {
            setData(res)
        })
    }

    useEffect(() => {
        FetchMyHomeworks()
    }, [])

    return (
        <div className="dashboard-container">
            <div className="list-info-header">
                <h1 className="list-header">Homework List</h1>
            </div>

            {data.map((value, index) => (
                <div className="table" key={index}>
                    <h1> {moment(value.createdAt).format('DD/MM/YYYY')}</h1>
                    <AiOutlineArrowRight className="table-icon" onClick={() => history.push(`../upload-homework/${value.homework_id}`)} />
                </div>
            ))}
        </div>
    )
}

export default MyHomeworks
