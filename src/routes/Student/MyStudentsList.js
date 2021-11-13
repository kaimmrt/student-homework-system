import React, { useState, useEffect } from 'react'
import { post } from '../../networking/Server'
import { Button } from 'antd'
import { useHistory, useParams } from 'react-router-dom'
import { AiOutlineArrowRight } from 'react-icons/ai';

const MyStudentsList = () => {
    const history = useHistory()
    const { class_id } = useParams()

    const [data, setData] = useState([])


    const FetchStudents = () => {
        post("/api/user/students-of-the-class", {
            class_id
        }).then(res => {
            setData(res)
        })
    }

    useEffect(() => {
        FetchStudents()
    }, [])

    return (
        <div className="dashboard-container">
            <div className="list-info-header">
                <h1 className="list-header">My Students </h1>
            </div>

            {data.map((value, index) => (
                <div className="table" key={index}>
                    <h1> {value.name}</h1>
                    <p>{value.class_id == null ? 'Atanmamış' : value.class_id.class_name}</p>
                    <AiOutlineArrowRight className="table-icon" onClick={() => history.push(`../student/${value.user_id}`)} />
                </div>
            ))}

        </div>
    )
}

export default MyStudentsList
