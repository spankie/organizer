import React from "react";

import { Form, Divider, Input, Button } from "antd";

class AddOrganization extends React.Component {
  render() {
    return (
      <section className="ant-col ant-col-sm-8 ant-col-sm-offset-8">
        <h2>Add Organization</h2>
        <Divider />
        <div className="col-12 col-offset-6">
          <Form.Item label="Name">
            <Input placeholder="input placeholder" />
          </Form.Item>
          <Form.Item label="Address">
            <Input placeholder="input placeholder" />
          </Form.Item>
          <Form.Item>
            <Button type="primary">Submit</Button>
          </Form.Item>
        </div>
      </section>
    );
  }
}

export default AddOrganization;
