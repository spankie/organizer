import React from "react";
import "./Login.css";
import { Form, Icon, Input, Button, Checkbox, message, Row, Col, Divider } from "antd";
import localforage from "localforage";
import { Link } from "react-router-dom";
import axios from "axios";
import { ShowErrors } from "../components/common";

function NormalLoginForm(props) {
  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (err) return
      console.log(process.env);
      axios.post(`http://localhost:8080/v1/user/login`, values)
      .then(res => {
        console.log(res);
        message.success(res.data.message);
        // save the token here to localstorage.
        if (res.data.token) {
          res.data.user.token = res.data.token;
          localforage.setItem("user", res.data.user).then(user => {
            console.log(user);
            props.history.push("/dashboard", {});
          });
        } else {
          message.error("Could not log you in. Please try again.");
        }
      }).catch(ShowErrors).finally(()=> {
        // do something here...
      });
      console.log("Received values of form: ", values);

      // console.log(props);
    });
  };

  const { getFieldDecorator } = props.form;
  return (
    <Row>
    <Col sm={{span:12, offset:6}} style={{padding: "2rem"}}>
      <h1>Login here</h1>
      <Divider/>
        <Form onSubmit={handleSubmit}>
          <Form.Item>
            {getFieldDecorator("email", {
              rules: [
                { required: true, message: "Please input your email!" }
              ]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Email"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("password", {
              rules: [
                { required: true, message: "Please input your Password!" }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="Password"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("remember", {
              valuePropName: "checked",
              initialValue: true
            })(<Checkbox>Remember me</Checkbox>)}
            <a className="login-form-forgot" href="#!">
              password
            </a>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
            Or <Link to="/register" style={{color: "#1890ff"}}>register now!</Link>
          </Form.Item>
        </Form>
      </Col>
        </Row>
  );
}

export default Form.create({ name: "normal_login" })(NormalLoginForm);
