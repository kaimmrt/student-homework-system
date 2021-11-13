import React, { useState, useEffect } from 'react'
import { useParams, useHistory, Link } from 'react-router-dom'
import { post } from '../../networking/Server'
import { Button, Form, Input, Select } from "antd";
import { useSelector } from "react-redux";
import moment from 'moment';
import { AiOutlineArrowRight } from 'react-icons/ai';

const Teacher = () => {
    const authUser = useSelector(({ auth }) => auth.authUser);

    const { Option } = Select;
    const { user_id } = useParams()
    const history = useHistory()

    const [data, setData] = useState("")
    const [classList, setClassList] = useState([])
    const [homeworks, setHomeworks] = useState([])

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
        post("/api/user/student", {
            user_id
        }).then(res => {
            setData(res)
        })
    }

    const FetchClassList = () => {
        post("/api/class/class-list", {

        }).then(res => {
            setClassList(res)
        })
    }

    const FetchStudentsHomework = () => {
        post("/api/homework/student-homeworks", {
            user_id
        }).then(res => {
            setHomeworks(res)
            console.log(res)
        })
    }

    useEffect(() => {
        FetchClass()
        FetchClassList()
        FetchStudentsHomework()
    }, [])

    if (data.user_type_id == null) {
        return <div>Loading...</div>
    }
    return (
        <div className="dashboard-container" style={{ display: 'flex' }}>
            <div className="info-container">
                <p className="info-header">{data.name}</p>
                <p>{data.user_type.user_type}</p>
                {
                    data.class_id == null
                        ?
                        <Form
                            initialValues={{ remember: true }}
                            name="basic"
                            onFinish={onFinish}
                        >
                            <Form.Item
                                name="class_id">
                                <Select
                                    showSearch
                                    style={{ width: 200 }}
                                    placeholder="Assign to class"
                                    optionFilterProp="children"
                                >
                                    {classList.map((value, index) => (
                                        <Option value={value.class_id}>{value.class_name}</Option>
                                    ))}
                                </Select>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Save
                                </Button>
                            </Form.Item>
                        </Form>

                        :
                        <p className="info-class-name">{data.class.class_name}</p>

                }
            </div>
            <div className="info-list-container">
                {
                    homeworks[0] ?
                        <div>
                            {homeworks.map((value, index) => (
                                <div className="table" key={index}>
                                    <h1> {moment(value.createdAt).format('DD/MM/YYYY')}</h1>
                                    <AiOutlineArrowRight className="table-icon" onClick={() => history.push(`../homework/${value.homework_id}`)} />
                                </div>
                            ))}
                        </div> :
                        <div>No homeworks</div>
                }
            </div>
        </div>
    )
}

export default Teacher
