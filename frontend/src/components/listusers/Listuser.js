import React from "react";
import styled from "styled-components";

import { Table } from "antd";

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
function ListUsers() {
  const dataSource = [
    {
      key: "1",
      fname: "Mike",
      lname: 32,
      email: "email@host.com"
    },
    {
      key: "2",
      fname: "John",
      lname: 42,
      email: "email@host.com"
    }
  ];

  const columns = [
    {
      title: "First Name",
      dataIndex: "fname",
      key: "fname"
    },
    {
      title: "Last Name",
      dataIndex: "lname",
      key: "lname"
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email"
    }
  ];
  return (
    <Section>
      <h3>List of users</h3>
      <Table dataSource={dataSource} columns={columns} />
    </Section>
  );
}

export default ListUsers;
