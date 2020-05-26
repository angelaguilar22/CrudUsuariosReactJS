import React, { Component } from "react";
// import components of antd 
import { Layout, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
// import of styles
import '../styles/MainMenuStyles.css';
//import of navigatrions
import { Link } from "react-router-dom";
// import of images
import profileImg from '../assets/svg/undraw_profile_pic_ic5t.svg';

// constants for componnens antd
const { Sider } = Layout;


export default class MainMenu extends Component {

  constructor(props) {
    super(props);

    // state of component
    this.state = { collapsed: true };
  }

  componentDidMount() {
  }

  // SetStateSincrono 
  setStateAsync = (state) => {
    return new Promise((resolver, reject) => {
      this.setState(state, () => {
        resolver(true)
      });
    });
  }

  toggle = async () => {
    await this.setStateAsync({ collapsed: !this.state.collapsed });
  };

  render() {

    return (
      <Layout className="all">


        {/* <Header className="site-layout-background" style={{ padding: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: this.toggle,
          })}

          <Dropdown className="profile-container" overlay={menu} trigger={['click']}>
            <span style={{ color: 'white', marginRight: '10px' }}>
              Angel Aguilar
              <img src={profileImg} alt="Avatar" className="profileAvatar" />
            </span>
          </Dropdown>

        </Header> */}

        <Layout>
          <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.toggle}>

            <div className="profile-container">
              <img src={profileImg} alt="Avatar" className="profileAvatar" />
            </div>

            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
         
              <Menu.Item key="1">
                <Link to="/" style={{display: 'flex', alignItems: 'center'}}>
                  <UserOutlined />
                  <span style={{marginBottom: 0}}>Usuarios</span>
                </Link>
              </Menu.Item>

            </Menu>
          </Sider>

          <Layout className="site-layout">

            <div
              className="site-layout-background"
              style={{
                margin: '24px 16px',
                padding: 15,
                maxHeight: 1200,
                height: 'auto'
              }}
            >
              {this.props.children}
            </div>
          </Layout>

        </Layout>
      </Layout>
    );

  }
}
