import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import { connect } from 'react-redux';
import axios from 'axios';

import getConfig from 'next/config';
import Link from 'next/link';

const { publicRuntimeConfig } = getConfig();
const api = require('../libs/api');
import Detail from './detail';

const Title = styled.h1`
  color: black;
  font-size: 20px;
`;

const Index = ({ isLogin, userRepos, userStarring }) => {
  console.log(userRepos);
  console.log(userStarring);
  console.log(isLogin);
  // useEffect(() => {
  //   axios.get('/api/user/info').then((res) => console.log(res));
  // }, []);

  return (
    <div>
      <Title>NextJS</Title>
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
      <a href={publicRuntimeConfig.OAUTH_URL}>Github Login</a>
    </div>
  );
};

Index.getInitialProps = async ({ ctx, reduxStore }) => {
  // reduxStore.dispatch(add(10));
  const { user } = reduxStore.getState();
  if (!user || !user.id) {
    return {
      isLogin: false,
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
    // .then((res) => console.log(res))
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
    isLogin: true,
    userRepos: userRepos.data,
    userStarring: userStarring.data,
  };
};

function mapStateToProps(state) {
  return {
    counter: state.counter.counter,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    add: (counter) => dispatch({ type: 'ADD', payload: { counter } }),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);
