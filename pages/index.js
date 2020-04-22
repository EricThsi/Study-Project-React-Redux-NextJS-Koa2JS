import React from 'react';
import Link from 'next/link';
import { Button } from 'antd';
import './index.scss';

export default () => (
  <Link href='/a'>
    <Button>Hello world! NextJS</Button>
  </Link>
);
