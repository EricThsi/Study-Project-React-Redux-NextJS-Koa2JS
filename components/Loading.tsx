import React from 'react';
import { Spin } from 'antd';

const Loading: React.FC = (props) => {
  return (
    <div className='page-loading'>
      <style jsx>{`
        .page-loading {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: rgba(255, 255, 255, 0.3);
          z-index: 999;
        }
      `}</style>
      <Spin />
    </div>
  );
};

export default Loading;
