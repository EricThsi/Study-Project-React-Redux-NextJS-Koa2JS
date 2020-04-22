import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { Button } from 'antd';
import store from '../store/store';
import './index.scss';

const Title = styled.h1`
  color: yellow;
  font-size: 20px;
`;

export default () => (
  <div>
    <Title>NextJS</Title>
    <Link href='/a'>
      <Button>Hello world! NextJS</Button>
    </Link>
  </div>
);
