import React, { useState, useEffect } from 'react'
import { post } from '../../networking/Server'
import { Button } from 'antd'
import { useHistory } from 'react-router-dom'
import { AiOutlineArrowRight } from 'react-icons/ai';

const StudentList = () => {
    const history = useHistory()
    const [data, setData] = useState([])

    const FetchTeacherList = () => {
        post("/api/user/teacher-without-classlist", {

        }).then(res => {
            setData(res)
        })
    }

    useEffect(() => {
        FetchTeacherList()
    }, [])

    return (
        <div className="dashboard-container">

            <div className="list-info-header">
                <h1 className="list-header">List Of Teacher Without Class</h1>
                <Button className="list-button" onClick={() => history.push('../teacher-list')}>All Teacher Lists</Button>
            </div>

            {data.map((value, index) => (
                <div className="table" key={index}>
                    <h1> {value.name}</h1>
                    <p>{value.class_id == null ? 'Atanmamış' : value.class_id.class_name}</p>
                    <AiOutlineArrowRight className="table-icon" onClick={() => history.push(`../teacher/${value.user_id}`)} />
                </div>
            ))}

        </div>
    )
}

export default StudentList
