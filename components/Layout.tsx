import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Layout, Input, Avatar, Tooltip, Dropdown, Menu } from 'antd';
import { GithubOutlined, UserOutlined } from '@ant-design/icons';
import getConfig from 'next/config';
import Link from 'next/link';

import { logout } from '../store';

const { publicRuntimeConfig } = getConfig();
const { Header, Content, Footer } = Layout;

interface User {
  id?: number;
  avatar_url?: string;
}

interface Router {
  asPath: string;
  push: (str) => void;
  query: {
    q: string;
  };
}

interface LayoutProps {
  user?: User;
  logout: () => void;
  router: Router;
}

const AppLayout: React.FC<LayoutProps> = (props) => {
  const { user, logout, router } = props;
  const urlQuery = router.query && router.query.q;
  const [search, setSearch] = useState(urlQuery || '');
  // console.log(router);

  const handleSearchChange = useCallback(
    (evt) => {
      setSearch(evt.target.value);
    },
    [setSearch]
  );

  const handleOnSearch = useCallback(() => {
    router.push(`/search?q=${search}`);
  }, [search]);

  const handleLogout = useCallback((evt) => {
    evt.preventDefault();
    logout();
  }, []);

  const handleGotoOAuth = useCallback((evt) => {
    evt.preventDefault();

    axios
      .get(`/prepare-auth?url=${router.asPath}`)
      .then((res) => {
        if (res.status === 200) {
          location.href = publicRuntimeConfig.OAUTH_URL;
        } else {
          console.error('prepare auth failed', res);
        }
      })
      .catch((err) => {
        console.error('prepare auth filed', err);
      });
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
          min-height: 100%;
        }
      `}</style>
      <Header>
        <div className='header-inner'>
          <div className='header-left'>
            <div className='logo'>
              <Link href='/'>
                <GithubOutlined
                  style={{
                    color: 'white',
                    fontSize: 32,
                    verticalAlign: 'middle',
                    marginRight: 20,
                  }}
                />
              </Link>
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
                <a
                  href={publicRuntimeConfig.OAUTH_URL}
                  title='Github Login'
                  onClick={handleGotoOAuth}
                >
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
