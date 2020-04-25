import React from 'react';
import { Layout, Input, Avatar } from 'antd';
import { GithubOutlined, UserOutlined } from '@ant-design/icons';
import { useState, useCallback } from 'react';

import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
const { Header, Content, Footer } = Layout;

const AppLayout: React.FC = (props) => {
  const [search, setSearch] = useState('');

  const handleSearchChange = useCallback(
    (evt) => {
      setSearch(evt.target.value);
    },
    [setSearch]
  );

  const handleOnSearch = useCallback(() => {}, []);

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
            <a href={publicRuntimeConfig.OAUTH_URL} title='Github Login'>
              <Avatar icon={<UserOutlined />} />
            </a>
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

export default AppLayout;
