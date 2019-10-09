import React from "react";
import "./Login.css";
import { Form, Icon, Input, Button, Checkbox, message } from "antd";
import localforage from "localforage";
import { Link } from "react-router-dom";
import Axios from "axios";

function NormalLoginForm(props) {
  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (err) return
      Axios.post("http://localhost:8080/v1/user/login", values)
      .then(res => {
        console.log(res);
        message.success(res.data.message);
        // save the token here to localstorage.
        if (res.data.token) {
          localforage.setItem("token", res.data.token).then(token => {
            console.log(token);
            localforage.setItem("user", res.data.user);
            props.history.push("/dashboard", {});
          });
        } else {
          message.error("Could not log you in. Please try again.");
        }
      }).catch(err => {
        console.log(err);
      }).finally(()=> {
        // do something here...
      });
      console.log("Received values of form: ", values);

      console.log(props);
    });
  };

  const { getFieldDecorator } = props.form;
  return (
    <section className="container">
      <div className="login-form">
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
      </div>
    </section>
  );
}

export default Form.create({ name: "normal_login" })(NormalLoginForm);
