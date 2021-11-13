import React, { useState, useEffect } from 'react'
import { useParams, useHistory, Link } from 'react-router-dom'
import { post } from '../../networking/Server'
import { Button, Form, Input, Select } from "antd";
import { AiOutlineArrowRight } from 'react-icons/ai';

const Teacher = (props) => {
    const history = useHistory()

    const { user_id } = useParams()
    const class_id = props.location.state.class_id

    const [data, setData] = useState("")
    const [classList, setClassList] = useState([])
    const [students, setStudents] = useState([])

    const onFinish = values => {
        console.log(values)
        post("/api/user/update-user-class", {
            class_id: values.class_id,
            user_id
        }).then((res) => {
            window.location.reload()
        })
    };

    const FetchClass = () => {
        post("/api/user/", {
            user_id
        }).then(res => {
            console.log(res)
            setData(res)
        })
    }

    const FetchClassList = () => {
        post("/api/class/class-list", {

        }).then(res => {
            setClassList(res)
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
        FetchClassList()
        FetchStudents()
    }, [])

    if (data.user_id == null) {
        return <div>Loading...</div>
    }
    return (
        <div className="dashboard-container">
            <div className="info">
                <div className="info-container">
                    <p className="info-header">{data.name}</p>
                    <h4>{data.user_type.user_type}</h4>
                    {
                        data.class == null
                            ?
                            <Form name="basic" onFinish={onFinish} style={{ width: '80%', marginLeft: '10%' }}>
                                <Form.Item name="class_id">
                                    <Select style={{ width: '80%', marginBottom: 10 }}>
                                        {classList.map((value, index) => (
                                            <Select.Option value={value.class_id}>{value.class_name}</Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                                <Form.Item>
                                    <Button htmlType="submit">Save</Button>
                                </Form.Item>
                            </Form>

                            :
                            <h3>{data.class.class_name}</h3>
                    }
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
                                            <p>{value.class_id == null ? 'unassigned' : value.class_id.class_name}</p>
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

export default Teacher
