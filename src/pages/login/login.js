import { Form, Icon, Input, Button, Checkbox} from 'antd';
import React, { Component } from 'react';
import {postApi} from "../../axios/api"

import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link
} from 'react-router-dom';
import 'antd/dist/antd.css';
import "./login.css";


class Login extends React.Component {
    constructor(props){
        super(props)
        this.state={

        }
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let params={
                    account:values.username,
                    password:values.password
                }
                postApi("/login/login",params).then(
                    data => {
                        // if (data.repCode === '0000') {
                            this.props.history.push("/app")
                        // }
                    }
                ).catch(
                    error => {
                        console.log("失败")
                    }
                )
                // console.log('Received values of form: ', values);
                // this.props.history.push("/app",{
                //     data:"你好呀"
                // })
            }
        });
    };
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="main">
                <div className="loginMain">
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {getFieldDecorator('username', {
                                rules: [{ required: true, message: 'Please input your username!' }],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="Username"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('password', {
                                rules: [{ required: true, message: 'Please input your Password!' }],
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="Password"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(<Checkbox>Remember me</Checkbox>)}
                            <a className="login-form-forgot" href="">
                                Forgot password
                            </a>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                Log in
                            </Button>
                            Or <a href="">register now!</a>
                        </Form.Item>
                    </Form>
                </div>
            </div>
            // <button onClick={(e) => this.handClick(e)}>
            //     登陆页面
            // </button>
        );
    }
}

export default Form.create()(Login)