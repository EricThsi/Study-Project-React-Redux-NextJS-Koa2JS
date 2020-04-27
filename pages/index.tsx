import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';

import getConfig from 'next/config';
import Link from 'next/link';

const { publicRuntimeConfig } = getConfig();
const api = require('../libs/api');
import Repo from '../components/Repo';
import Detail from './detail';

const Title = styled.h1`
  color: black;
  font-size: 20px;
`;

const Index = ({ user, isLogin, userRepos, userStarring }) => {
  // console.log(userRepos);
  // console.log(userStarring);

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
        {userRepos.map((repo) => (
          <Repo repo={repo} key={repo.id} />
        ))}
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
      userRepos: {},
      userStarring: {},
    };
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

  const userStarring = await api
    .request(
      {
        url: '/user/starred',
      },
      req,
      res
    )
    .catch((err) => console.error(err));

  return {
    userRepos: userRepos.data,
    userStarring: userStarring.data,
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
