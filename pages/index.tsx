import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import { connect } from 'react-redux';
import axios from 'axios';

import getConfig from 'next/config';
import Link from 'next/link';

const { publicRuntimeConfig } = getConfig();
import { addAsync, add } from '../store';
import Detail from './detail';

const Title = styled.h1`
  color: black;
  font-size: 20px;
`;

const Index = ({ counter, add }) => {
  useEffect(() => {
    axios.get('/api/user/info').then((res) => console.log(res));
  }, []);

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
      <p>
        <Button onClick={() => add(5)}>Counter: {counter}</Button>
      </p>
      <a href={publicRuntimeConfig.OAUTH_URL}>Github Login</a>
    </div>
  );
};

Index.getInitialProps = async ({ reduxStore }) => {
  // await addAsync(10);
  reduxStore.dispatch(add(10));
  return {};
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
