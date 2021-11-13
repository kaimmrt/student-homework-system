import React, { useState, useEffect } from 'react'
import { post } from '../../networking/Server'
import { Button } from 'antd'
import { useHistory } from 'react-router-dom'
import { AiOutlineArrowRight } from 'react-icons/ai';

const StudentList = () => {
    const history = useHistory()
    const [data, setData] = useState([])

    const FetchStudentList = () => {
        post("/api/user/student-list", {

        }).then(res => {
            setData(res)
        })
    }

    useEffect(() => {
        FetchStudentList()
    }, [])

    return (
        <div className="dashboard-container">
            <div className="list-info-header">
                <h1 className="list-header">Student Listt</h1>
                <Button className="list-button" onClick={() => history.push('../student-without-list')}>Students Without Class</Button>
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

export default StudentList
