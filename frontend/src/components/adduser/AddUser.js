import React from "react";
import styled from "styled-components";

import { Input, Form, Button } from "antd";

const User = styled.section`
  width: 100%;
  margin: auto;
  border: 1px solid #ebedf0;
  border-radius: 5px;
  padding: 20px;
  @media screen and (min-width: 640px) {
    width: 400px;
    margin: auto;
  }
`;

function AddUser() {
  return (
    <User>
      <h4>Add New User</h4>
      <Form>
        <Form.Item style={{ width: "inherit !important" }}>
          <Input placeholder="First name" />
        </Form.Item>
        <Form.Item>
          <Input placeholder="Last name" />
        </Form.Item>
        <Form.Item>
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item>
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Input.Password placeholder="Confirm Password" />
        </Form.Item>

        <Button type="primary" block>
          Add User
        </Button>
      </Form>
    </User>
  );
}

export default AddUser;
