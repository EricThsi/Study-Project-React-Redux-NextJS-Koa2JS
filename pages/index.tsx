import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Button, Tabs } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';
import Link from 'next/link';
import Router from 'next/router';
import LRU from 'lru-cache';

import getConfig from 'next/config';
import Repo from '../components/Repo';
import Detail from './detail';

const api = require('../libs/request');
const { publicRuntimeConfig } = getConfig();
const cache = new LRU({
  maxAge: 1000 * 60 * 10,
});
const isServer = typeof window === 'undefined';

const Title = styled.h1`
  color: black;
  font-size: 20px;
`;

const Index = ({
  router,
  user,
  isLogin,
  userRepos = [],
  userStarredRepos = [],
}) => {
  const { key: tabKey = '1' } = router.query;

  const handleTabChange = (activeKey) => {
    Router.push(`/?key=${activeKey}`);
  };

  useEffect(() => {
    if (!isServer) {
      if (userRepos) {
        cache.set('userRepos', userRepos);
      }

      if (userStarredRepos) {
        cache.set('userStarredRepos', userStarredRepos);
      }
    }
  }, [userRepos, userStarredRepos]);

  if (!isLogin) {
    return (
      <div>
        <p>Please Login.</p>
        <Button type='primary' href={publicRuntimeConfig.OAUTH_URL}>
          Github Login
        </Button>
      </div>
    );
  }
  return (
    <div className='page-wrapper'>
      <style jsx>{`
        .page-wrapper {
          display: flex;
          align-items: flex-start;
        }

        .user-info {
          display: flex;
          flex-direction: column;
          width: 200px;
          margin-right: 20px;
          flex-shrink: 0;
        }

        .avatar {
          width: 180px;
          min-height: 100%;
          border: 1px solid #ccc;
          border-radius: 5px;
        }

        .login {
          font-weight: 800;
          font-size: 20px;
        }
      `}</style>
      <div className='user-info'>
        <img src={user.avatar_url} alt='User avatar' className='avatar' />
        <p className='login'>{user.login}</p>
        <p className='name'>{user.name}</p>
        <p className='bio'>{user.bio}</p>
        <p className='email'>
          <MailOutlined />
          <a href={`mailto:${user.email}`}>{user.email}</a>
        </p>
      </div>
      <div className='user-repos'>
        <Tabs
          defaultActiveKey={tabKey}
          animated={false}
          onChange={handleTabChange}
        >
          <Tabs.TabPane tab='Your Repo' key='1'>
            {userRepos.map((repo) => (
              <Repo repo={repo} key={repo.id} />
            ))}
          </Tabs.TabPane>
          <Tabs.TabPane tab='Your Starred Repo' key='2'>
            {userStarredRepos.map((repo) => (
              <Repo repo={repo} key={repo.id} />
            ))}
          </Tabs.TabPane>
        </Tabs>
        <Link
          href={{
            pathname: '/detail',
            query: {
              name: 'user',
            },
          }}
          passHref
        >
          <a>Detail</a>
        </Link>
      </div>
    </div>
  );
};

Index.getInitialProps = async ({ ctx, reduxStore }) => {
  // reduxStore.dispatch(add(10));
  const { user } = reduxStore.getState();
  if (!(user && user.id)) {
    return {
      userRepos: [],
      userStarredRepos: [],
    };
  }
  if (!isServer) {
    if (cache.get('userRepos') && cache.get('cachedUserStarredRepos')) {
      return {
        userRepos: cache.get('userRepos'),
        userStarredRepos: cache.get('cachedUserStarredRepos'),
      };
    }
  }

  const { req, res } = ctx;
  const userRepos = await api
    .request(
      {
        url: '/user/repos',
        // url: '/search/repositories?q=react',
      },
      req,
      res
    )
    .catch((err) => console.error(err));

  const userStarredRepos = await api
    .request(
      {
        url: '/user/starred',
      },
      req,
      res
    )
    .catch((err) => console.error(err));

  return {
    userRepos: userRepos && userRepos.data,
    userStarredRepos: userStarredRepos && userStarredRepos.data,
  };
};

function mapStateToProps(state) {
  const { user } = state;
  return {
    user,
    isLogin: !!(user && user.id),
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);
