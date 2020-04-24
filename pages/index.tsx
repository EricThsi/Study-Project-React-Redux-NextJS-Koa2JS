import React from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { addAsync, add } from '../store';
import Layout from '../components/Layout';
import './index.scss';

const Title = styled.h1`
  color: red;
  font-size: 20px;
`;

const Index = ({ counter, add }) => (
  <Layout>
    <Title>NextJS</Title>
    <Button onClick={() => add(5)}>Hello world! NextJS</Button>
    <p>Counter: {counter}</p>
  </Layout>
);

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
