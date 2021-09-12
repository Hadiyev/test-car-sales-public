import React, { useState } from "react";

import { NavLink } from "react-router-dom";

import firebase from "./Firestore";

import { Menu, Button, Layout } from "antd";

import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
  UnorderedListOutlined,
  InfoCircleOutlined,
  DoubleRightOutlined,
  QuestionCircleOutlined,
  ProfileOutlined,
  LoginOutlined,
} from "@ant-design/icons";

import logo from "../files/logo-v5.PNG";

const { SubMenu } = Menu;

const { Header, Content, Footer } = Layout;

export default function NavBar(props) {
  const [current, setCurrent] = useState("home");

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <Layout>
      <Header
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          background: "#000",
          height: "100%",
        }}
      >
        {/* <div className="logo"> */}
        {/* </div> */}
        <NavLink
          onClick={(e) => {
            setCurrent(null);
          }}
          to="/"
        >
          <img className="logo" src={logo} alt="logo" />
        </NavLink>
        <Menu
          style={{ backgroundColor: "black" }}
          theme="dark"
          onClick={handleClick}
          selectedKeys={[current]}
          mode="horizontal"
        >
          <Menu.Item key="cars" icon={<UnorderedListOutlined />}>
            <NavLink to="/">Elanlar</NavLink>
          </Menu.Item>
          <Menu.Item key="about" icon={<InfoCircleOutlined />}>
            <NavLink to="/about">Haqqımızda</NavLink>
          </Menu.Item>
          <Menu.Item key="why" icon={<QuestionCircleOutlined />}>
            <NavLink to="/why">Nəyə Görə Biz?</NavLink>
          </Menu.Item>
          <Menu.Item key="sell" icon={<DoubleRightOutlined />}>
            <NavLink to="/sell">Bizimlə Sat!</NavLink>
          </Menu.Item>
          {props.isSignedIn ? (
            <SubMenu key="SubMenu" icon={<ProfileOutlined />} title="Hesabım">
              <Menu.Item key="setting:1">
                <NavLink to="/car/add">Elan Əlavə Et</NavLink>
              </Menu.Item>
              <Menu.Item key="setting:2">
                <NavLink to={`/users/${firebase.auth().currentUser.uid}`}>
                  Elanlarım
                </NavLink>
              </Menu.Item>
              <Menu.Item
                key="setting:3"
                onClick={() => firebase.auth().signOut()}
              >
                Çıxış
              </Menu.Item>
            </SubMenu>
          ) : (
            <Menu.Item key="login" icon={<LoginOutlined />}>
              <NavLink to="/login">Giriş</NavLink>
            </Menu.Item>
          )}
        </Menu>
      </Header>
    </Layout>
  );
}
