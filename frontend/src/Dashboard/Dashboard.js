import React, { useState } from "react";
import { Route, Link } from "react-router-dom";

import AddUser from "../components/adduser/AddUser";
import ListUsers from "../components/listusers/Listuser";
import ChangePassword from "../components/changepassword/ChangePassword";

import "./Dashboard.css";
import styled from "styled-components";

import { Layout, Menu, Breadcrumb, Icon } from "antd";
import { Avatar } from "antd";
const { Header, Content, Footer, Sider } = Layout;

function Dashboard() {
  const [state, setState] = useState({ collapsed: false });

  let onCollapse = collapsed => {
    console.log(collapsed);
    setState({ collapsed });
  };

  const AvatarImg = styled.section`
    float: right;
    padding-right: 30px;
    display: flex;
    flex-direction: column;
    margin-top: 7px;
    align-items: center;

    &:hover {
      ul {
        z-index: 9999;
        list-style-type: none;
        align-items: flex-start;
        display: flex;
        margin: 0px 0px 0px 0px !important;
        padding: 0px 0px 0px 0px;

        border-radius: 5px;
        border: 1px solid #ebedf0;
        background-color: #cccccc;

        li {
          padding-left: 10px;
          padding-right: 10px;
        }
      }
    }
  `;

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={state.collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1">
            <Icon type="home" />
            <span>
              <Link to="/dashboard/">Organization</Link>
            </span>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="user-add" />
            <span>
              <Link to="/dashboard/adduser">Add User</Link>
            </span>
          </Menu.Item>
          <Menu.Item key="3">
            <Icon type="usergroup-add" />
            <span>
              <Link to="/dashboard/listuser">List User</Link>
            </span>
          </Menu.Item>
          <Menu.Item key="4">
            <Icon type="setting" />
            <span>
              <Link to="/dashboard/settings">Change Password</Link>
            </span>
          </Menu.Item>
          <Menu.Item key="5">
            <Icon type="poweroff" />
            <span>Logout</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{ background: "#fff", padding: 0 }}
          className="header-avatar"
        >
          <AvatarImg>
            <Avatar size={50} icon="user"></Avatar>
            <ul>
              <li>
                <Icon type="poweroff" />
              </li>
              <li>Logout</li>
            </ul>
          </AvatarImg>
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}></Breadcrumb>

          <div style={{ padding: 24, background: "#fff", minHeight: '100%' }}>
            <Route path="/dashboard/adduser" component={AddUser} />
            <Route path="/dashboard/listuser" component={ListUsers} />
            <Route path="/dashboard/settings" component={ChangePassword} />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          The App design by the Things
        </Footer>
      </Layout>
    </Layout>
  );
}

export default Dashboard;
