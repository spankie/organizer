import React from "react";
import styled from "styled-components";

import { Form, Input, Button } from "antd";

const Section = styled.section`
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
function ChangePassword() {
  return (
    <Section>
      <h3>Change Password</h3>
      <Form>
        <Form.Item label="Password">
          <Input.Password />
        </Form.Item>
        <Form.Item label="Confirm Password">
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Change
          </Button>
        </Form.Item>
      </Form>
    </Section>
  );
}

export default ChangePassword;
