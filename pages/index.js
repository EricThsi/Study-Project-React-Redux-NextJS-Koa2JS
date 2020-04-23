import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Button } from 'antd';
import { connect } from 'react-redux';
import './index.scss';

const Title = styled.h1`
  color: red;
  font-size: 20px;
`;

const Index = ({ counter, add }) => (
  <div>
    <Title>NextJS</Title>
    <Button onClick={() => add(5)}>Hello world! NextJS</Button>
    <p>Counter: {counter}</p>
  </div>
);

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
