import React from "react";
import { Row, Col, Card } from "antd";

function DashboardHome() {
  return (
    <section className="ant-col ant-col-sm-8 ant-col-sm-offset-8">
      <h2>Cards</h2>
      <div style={{ background: "#ECECEC", padding: "30px" }}>
        <Row gutter={16}>
          <Col span={8}>
            <Card title="Card title" bordered={false}>
              Card content
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Card title" bordered={false}>
              Card content
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Card title" bordered={false}>
              Card content
            </Card>
          </Col>
        </Row>
      </div>
    </section>
  );
}

export default DashboardHome;
