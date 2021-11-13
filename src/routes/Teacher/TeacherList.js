import React, { useState, useEffect } from 'react'
import { post } from '../../networking/Server'
import { AiOutlineArrowRight } from 'react-icons/ai';
import { Button } from 'antd'
import { useHistory } from 'react-router-dom'

const TeacherList = () => {
    const history = useHistory()
    const [data, setData] = useState([])

    const FetchTeacherList = () => {
        post("/api/user/teacher-list", {

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
                <h1 className="list-header">All Teachers List</h1>
                <Button className="list-button" onClick={() => history.push('../teacher-without-list')}>Teachers Without Class</Button>
            </div>

            {data.map((value, index) => (
                <div className="table" key={index}>
                    <h1> {value.name}</h1>
                    <p>{value.class_id == null ? 'unassigned' : value.class_id.class_name}</p>
                    <AiOutlineArrowRight className="table-icon" onClick={() => history.push({
                        pathname: `../teacher/${value.user_id}`,
                        state: { class_id: value.class_id }
                    })} />
                </div>
            ))}

        </div>
    )
}

export default TeacherList
