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

const Index = () => (
  <div>
    <Title>NextJS</Title>
    <Link href='/a'>
      <Button>Hello world! NextJS</Button>
    </Link>
  </div>
);

export default connect(function maoStateToProps(state) {
  return {
    counter: state.counter.counter,
  };
})(Index);
