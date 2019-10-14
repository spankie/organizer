import React, { useState } from "react";
import { Route, Link, Switch } from "react-router-dom";
import { Layout, Menu, Breadcrumb, Icon } from "antd";
import avatar from "../assets/images/logo.svg";

import AddUser from "../components/adduser/AddUser";
import ListUsers from "../components/listusers/Listuser";
import ChangePassword from "../components/changepassword/ChangePassword";
import AddOrganization from "../components/addOrg/AddOrganization";
import DashboardHome from "../components/dashboardhome/DashboardHome";

import "./Dashboard.css";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu, Item } = Menu;

function Dashboard(props) {
  const [state, setState] = useState({ collapsed: false });

  let onCollapse = collapsed => {
    setState({ collapsed });
  };

  let UserTitle = (
    <div>
      <span
        style={{
          marginLeft: 0,
          width: "30px",
          height: "30px",
          display: "inline-block"
        }}
      >
        <img src={avatar} width="100%" height="100%" alt="img" />
      </span>
      <span>Dee</span>
    </div>
  );

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
              <Icon type="menu" />
              <span>Dashboard</span>
            </div>
          </Menu.Item>
          <SubMenu
            key="1"
            title={
              <div>
                <Icon type="home" />
                <Link to="/dashboard/">Organization</Link>
              </div>
            }
          >
            <Menu.Item key="sub1">Org 1</Menu.Item>
            <Menu.Item key="sub2">Org 2</Menu.Item>
            <Menu.Item key="sub3">Org 3</Menu.Item>
            <Menu.Item key="sub4">
              <Link to="/dashboard/addorg">Add Org</Link>
            </Menu.Item>
          </SubMenu>
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
                borderLeft: "1px solid fade(#e9e9e9, 5) !important"
              }}
              key="user"
            >
              <Item key="a">Profile</Item>
              <Item key="b">Settings</Item>
              <Item key="c">Logout</Item>
            </SubMenu>
          </Menu>
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}></Breadcrumb>

          <div style={{ padding: 24, background: "#fff", minHeight: "100%" }}>
            {props.location.pathname === "/dashboard" ? <DashboardHome /> : ""}
            <Switch>
              <Route path="/dashboard/addorg" component={AddOrganization} />
              <Route path="/dashboard/adduser" component={AddUser} />
              <Route path="/dashboard/listuser" component={ListUsers} />
              <Route path="/dashboard/settings" component={ChangePassword} />
            </Switch>
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
