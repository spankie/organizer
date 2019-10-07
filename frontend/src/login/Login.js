import React from "react";
import "./Login.css";
import { Form, Icon, Input, Button, Checkbox } from "antd";
import { Link } from "react-router-dom";

function NormalLoginForm(props) {
  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
      props.history.push("/dashboard", {});
      console.log(props);
    });
  };

  const { getFieldDecorator } = props.form;
  return (
    <section className="container">
      <div className="login-form">
        <Form onSubmit={handleSubmit}>
          <Form.Item>
            {getFieldDecorator("username", {
              rules: [
                { required: true, message: "Please input your username!" }
              ]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Username"
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
