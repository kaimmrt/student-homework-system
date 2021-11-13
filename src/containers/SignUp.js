import React, { useEffect } from "react";
import { Button, Form, Input, Radio } from "antd";
import { useHistory, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userSignUp } from "../appRedux/actions";

const FormItem = Form.Item;

const SignUp = () => {
    const dispatch = useDispatch();
    const authUser = useSelector(({ auth }) => auth.authUser);
    const history = useHistory();

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    const onFinish = values => {
        dispatch(userSignUp(values));
    };

    useEffect(() => {
        if (authUser !== null) {
            history.push('/signin');
        }
    }, [authUser]);

    return (
        <div>
            <div className="auth-container">
                <div className="auth-left-container">
                    <h1 className="auth-left-container-header">Student Homework System</h1>
                </div>
                <div className="auth-form">
                    <h1 className="auth-header">SIGN UP</h1>
                    <Form
                        initialValues={{ remember: true }}
                        name="basic"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        className="gx-signin-form gx-form-row0">

                        <Form.Item name="user_type">
                            <Radio.Group >
                                <Radio className="auth-radio" value={1}>Principal</Radio>
                                <Radio className="auth-radio" value={2}>Teacher</Radio>
                                <Radio className="auth-radio" value={3}>Student</Radio>
                            </Radio.Group>
                        </Form.Item>

                        <FormItem rules={[{ required: true, message: 'Please enter your first and last name!' }]} name="username" >
                            <Input className="auth-input" placeholder="First and Last Name" />
                        </FormItem>

                        <FormItem name="email" rules={[{
                            required: true, type: 'email', message: 'Please enter a valid e-mail address!',
                        }]}>
                            <Input className="auth-input" placeholder="Email" />
                        </FormItem>

                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please enter your password!',
                                },
                            ]}
                            hasFeedback
                        >
                            <Input.Password className="auth-input" placeholder="Password" />
                        </Form.Item>

                        <Form.Item
                            name="confirm"
                            dependencies={['password']}
                            hasFeedback
                            rules={[
                                {
                                    required: true,
                                    message: 'Please re-enter your password!',
                                },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('The two passwords you entered do not match!'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password className="auth-input" placeholder="Password Again" />
                        </Form.Item>

                        <FormItem>
                            <Button type="primary" className="auth-btn-typ-1" htmlType="submit">
                                Sign Up
                            </Button>
                            <span>or</span> <Link className="auth-btn-typ-2" to="/signin">Sign in</Link>

                        </FormItem>

                    </Form>
                </div>
            </div>
        </div>
    )
}

export default SignUp
