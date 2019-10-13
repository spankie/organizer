import React, { useState } from "react";
import { Route, Link } from "react-router-dom";
import { Layout, Menu, Breadcrumb, Icon } from "antd";
import avatar from "../assets/images/logo.svg";

import AddUser from "../components/adduser/AddUser";
import ListUsers from "../components/listusers/Listuser";
import ChangePassword from "../components/changepassword/ChangePassword";

import "./Dashboard.css";
import styled from "styled-components";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu, Item } = Menu;

function Dashboard() {
  const [state, setState] = useState({ collapsed: false });

  let onCollapse = collapsed => {
    console.log(collapsed);
    setState({ collapsed });
  };

  // const AvatarImg = styled.section`
  //   float: right;
  //   padding-right: 30px;
  //   display: flex;
  //   flex-direction: column;
  //   margin-top: 7px;
  //   align-items: center;

  //   &:hover {
  //     ul {
  //       z-index: 9999;
  //       list-style-type: none;
  //       align-items: flex-start;
  //       display: flex;
  //       margin: 0px 0px 0px 0px !important;
  //       padding: 0px 0px 0px 0px;

  //       border-radius: 5px;
  //       border: 1px solid #ebedf0;
  //       background-color: #cccccc;

  //       li {
  //         padding-left: 10px;
  //         padding-right: 10px;
  //       }
  //     }
  //   }
  // `;

  let UserTitle = (
    <div>
        <span
          style={{
            marginLeft: 0,
            width: "30px",
            height: "30px",
            display: "inline-block",
          }}
        >
          <img
            src={avatar}
            width="100%"
            height="100%"
            alt="img"
          />
        </span>
        <span>Dee</span>
      </div>
  )

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={state.collapsed}
        onCollapse={onCollapse}
        collapsedWidth="0"
        breakpoint="sm"
      >
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1">
            <div>
              <Icon type="home" />
              <Link to="/dashboard/">Organization</Link>
            </div>
          </Menu.Item>
          <Menu.Item key="2">
            <div>
              <Icon type="user-add" />
              <Link to="/dashboard/adduser">Add User</Link>
            </div>
          </Menu.Item>
          <Menu.Item key="3">
            <div>
              <Icon type="usergroup-add" />
              <Link to="/dashboard/listuser">List User</Link>
            </div>
          </Menu.Item>
          <Menu.Item key="4">
            <div>
              <Icon type="setting" />
              <Link to="/dashboard/settings">Change Password</Link>
            </div>
          </Menu.Item>
          <Menu.Item key="5">
            <div>
              <Icon type="poweroff" />
              <span>Logout</span>
            </div>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{ background: "#fff", padding: 0 }}
          className="header-avatar"
        >
          <Menu
            theme="dark"
            mode="horizontal"
            // className={style.user}
            defaultSelectedKeys={["user"]}
            style={{ lineHeight: "64px" }}
          >
            <SubMenu
              title={UserTitle}
              style={{
                float: "right",
                fontSize: "14px",
                borderLeft: "1px solid fade(#e9e9e9, 5) !important",
              }}
              key="user">
              <Item key="a">Profile</Item>
              <Item key="b">Settings</Item>
              <Item key="c">Logout</Item>
            </SubMenu>
          </Menu>
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}></Breadcrumb>

          <div style={{ padding: 24, background: "#fff", minHeight: "100%" }}>
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
