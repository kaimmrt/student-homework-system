import React, { useState, useEffect } from 'react'
import { useParams, useHistory, Link } from 'react-router-dom'
import { post } from '../../networking/Server'
import { AiOutlineArrowRight } from 'react-icons/ai';

const Class = () => {
    const history = useHistory()
    const { class_id } = useParams()
    const [data, setData] = useState("")
    const [teacher, setTeacher] = useState("")
    const [students, setStudents] = useState([])

    const FetchClass = () => {
        post("/api/class/class", {
            class_id
        }).then(res => {
            setData(res)
        })
    }

    const FetchTeacher = () => {
        post("/api/user/teacher-of-the-class", {
            class_id
        }).then(res => {
            setTeacher(res)
        })
    }


    const FetchStudents = () => {
        post("/api/user/students-of-the-class", {
            class_id
        }).then(res => {
            setStudents(res)
        })
    }

    useEffect(() => {
        FetchClass()
        FetchStudents()
        FetchTeacher()
    }, [])

    if (data == "") {
        return <div>Loading...</div>
    }
    return (
        <div className="dashboard-container">
            <div className="info">
                <div className="info-container">
                    <p className="info-header">{data.class_name}</p>
                    <p> {teacher == "" ? "Atanmamış" : teacher.name}</p>
                </div>
                <div className="info-list-container">
                    {
                        students[0] ?
                            <>
                                <h1>Student List</h1>
                                {
                                    students.map((value, index) => (
                                        <div key={index} className="info-table">
                                            <h1> {value.name}</h1>
                                            <p>{value.class_id == null ? 'Atanmamış' : value.class_id.class_name}</p>
                                            <AiOutlineArrowRight className="table-icon" onClick={() => history.push(`../student/${value.user_id}`)} />
                                        </div>
                                    ))
                                }

                            </>
                            : <p className="info-non-list"> No Students!!!</p>
                    }
                </div>
            </div>

        </div>
    )
}

export default Class
