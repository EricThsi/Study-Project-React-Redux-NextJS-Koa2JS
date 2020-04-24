import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import { connect } from 'react-redux';
import axios from 'axios';

import Layout from '../components/Layout';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();
import { addAsync, add } from '../store';
import './index.scss';

const Title = styled.h1`
  color: black;
  font-size: 20px;
`;

const Index = ({ counter, add }) => {
  useEffect(() => {
    axios.get('/api/user/info').then((res) => console.log(res));
  }, []);

  return (
    <Layout>
      <Title>NextJS</Title>
      <p>
        <Button onClick={() => add(5)}>Counter: {counter}</Button>
      </p>
      <a href={publicRuntimeConfig.OAUTH_URL}>Github Login</a>
    </Layout>
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
