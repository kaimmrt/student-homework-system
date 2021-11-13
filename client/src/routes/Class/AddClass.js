import React from 'react'
import { Form, Input, Button, Select, } from 'antd';
import { post } from '../../networking/Server'

const AddClass = () => {
    const onFinish = values => {
        post("/api/class/send-data", {
            class_name: values.class_name
        }).then((res) => {
            if (!res.error) {
                alert("başarılı")
            }
        })
    };

    const onFinishFailed = () => {
        console.log('Failed:');
    };

    return (
        <div className="dashboard-container">
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Class Name"
                    name="class_name"
                    rules={[{ required: true, message: 'Please enter class name!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item label="Teacher">
                    <Select>
                        <Select.Option value="demo">Mert</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>

    )
}

export default AddClass
