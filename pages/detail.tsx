import React from 'react';

interface IDetailProps {}

const Detail = () => <div>Detail</div>;

Detail.getInitialProps = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 3000);
  });
};

export default Detail;
