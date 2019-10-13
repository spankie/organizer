import React from "react";
import "./Register.css";
import {
  Form,
  Input,
  Tooltip,
  Icon,
  // Cascader,
  message,
  Select,
  Checkbox,
  Button,
  Col,
  Row,
} from "antd";
import axios from "axios";
import { Link } from "react-router-dom";
import { ShowErrors } from "../components/common";

const { Option } = Select;

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: []
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        axios.post(`http://localhost:8080/v1/user`, values)
        .then(res => {
          console.log(res);
          message.success(res.data.message);
        }).catch(ShowErrors).finally(()=>{
          // clear the form or something here...
        });
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };
    return (
      <Row>
        <Col sm={{span:12, offset:6}} style={{padding: "2rem"}}>
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item
            className="form-label"
            label={
              <span>
                Full Name&nbsp;
                <Tooltip title="What do you want us to call you?">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            }
          >
            {getFieldDecorator("fullname", {
              rules: [
                {
                  required: true,
                  message: "Please input your full name!",
                  whitespace: true
                }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item label="E-mail" className="form-label">
            {getFieldDecorator("email", {
              rules: [
                {
                  type: "email",
                  message: "The input is not valid E-mail!"
                },
                {
                  required: true,
                  message: "Please input your E-mail!"
                }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Password" className="form-label" hasFeedback>
            {getFieldDecorator("password", {
              rules: [
                {
                  required: true,
                  message: "Please input your password!"
                },
                {
                  validator: this.validateToNextPassword
                }
              ]
            })(<Input.Password />)}
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            className="form-label"
            hasFeedback
          >
            {getFieldDecorator("confirm", {
              rules: [
                {
                  required: true,
                  message: "Please confirm your password!"
                },
                {
                  validator: this.compareToFirstPassword
                }
              ]
            })(<Input.Password onBlur={this.handleConfirmBlur} />)}
          </Form.Item>
          <Form.Item
            className="form-label"
            label={
              <span>
                Address
                {/* <Tooltip title="What your address?">
                  <Icon type="question-circle-o" />
                </Tooltip> */}
              </span>
            }
          >
            {getFieldDecorator("address", {
              rules: [
                {
                  required: true,
                  message: "Please input your address!",
                  whitespace: true
                }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item
            className="form-label"
            label={<span>Gender</span>}
          >
            {getFieldDecorator("gender", {
              rules: [
                {
                  required: true,
                  message: "Please select you gender!",
                  whitespace: true
                }
              ]
            })(
            <Select style={{ width: 120 }} /*onChange={handleChange}*/>
              <Option value="" selected disabled>Gender</Option>
              <Option value="male">Male</Option>
              <Option value="female">Femal</Option>
            </Select>)}
          </Form.Item>
          {/*<Form.Item
            className="form-label"
            label={
              <span>
                Organization Name&nbsp;
                <Tooltip title="What is the name of your organization?">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            }
          >
            {getFieldDecorator("organization", {
              rules: [
                {
                  required: true,
                  message: "Please input your the name of your organization!",
                  whitespace: true
                }
              ]
            })(<Input />)}
          </Form.Item>*/}
          <Form.Item className="form-label agreement" {...tailFormItemLayout}>
            {getFieldDecorator("agreement", {
              valuePropName: "checked"
            })(
              <Checkbox>
                I have read the <Link to="#!">agreement</Link>
              </Checkbox>
            )}
          </Form.Item>
          <Form.Item className="form-label agreement" {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
            <br />
          </Form.Item>
            Or <Link to="/login" style={{color: "#1890ff"}}>Login here</Link>
        </Form>
      </Col>
      </Row>
    );
  }
}

const RegisterForm = Form.create({ name: "register" })(RegistrationForm);

export default RegisterForm;
