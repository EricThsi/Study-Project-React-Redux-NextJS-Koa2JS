import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Layout, Input, Avatar, Tooltip, Dropdown, Menu } from 'antd';
import { GithubOutlined, UserOutlined } from '@ant-design/icons';
import getConfig from 'next/config';

import { logout } from '../store';

const { publicRuntimeConfig } = getConfig();
const { Header, Content, Footer } = Layout;

interface User {
  id?: number;
  avatar_url?: string;
}

interface LayoutProps {
  user?: User;
  logout: () => void;
}

const AppLayout: React.FC<LayoutProps> = (props) => {
  const { user, logout } = props;
  const [search, setSearch] = useState('');

  const handleSearchChange = useCallback(
    (evt) => {
      setSearch(evt.target.value);
    },
    [setSearch]
  );

  const handleOnSearch = useCallback(() => {}, []);
  const handleLogout = useCallback((evt) => {
    evt.preventDefault();
    logout();
  }, []);

  const userDropdown = (
    <Menu>
      <Menu.Item>
        <a onClick={(evt) => handleLogout(evt)}>Logout</a>
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout>
      <style jsx>{`
        .header-inner {
          display: flex;
          justify-content: space-between;
        }

        .header-left {
          display: flex;
          justify-content: flex-start;
        }
      `}</style>
      <style jsx global>{`
        #__next {
          height: 100%;
        }
        .ant-layout {
          height: 100%;
        }
      `}</style>
      <Header>
        <div className='header-inner'>
          <div className='header-left'>
            <div className='logo'>
              <GithubOutlined
                style={{
                  color: 'white',
                  fontSize: 32,
                  verticalAlign: 'middle',
                  marginRight: 20,
                }}
              />
            </div>
            <div className='header-search'>
              <Input.Search
                placeholder='Search'
                value={search}
                onChange={handleSearchChange}
                onSearch={handleOnSearch}
              />
            </div>
          </div>
          <div className='header-right'>
            {user && user.id ? (
              <Dropdown overlay={userDropdown}>
                <a href='/'>
                  <Avatar src={user.avatar_url} />
                </a>
              </Dropdown>
            ) : (
              <Tooltip title='Click to login'>
                <a href={publicRuntimeConfig.OAUTH_URL} title='Github Login'>
                  <Avatar icon={<UserOutlined />} />
                </a>
              </Tooltip>
            )}
          </div>
        </div>
      </Header>
      <Content
        className='site-layout'
        style={{ padding: '0 50px', marginTop: 64 }}
      >
        <div
          className='site-layout-background'
          style={{ padding: 24, minHeight: 380 }}
        >
          {props.children}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        NextJS App By <a href='mailto:beefjava@gmail.com'>PlusWhite</a>
      </Footer>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapReducer = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapReducer)(AppLayout);
