import App from 'next/app';
import { Provider } from 'react-redux';
import NextHoc from '../libs/withRedux';

import Layout from '../components/Layout';

// import 'antd/dist/antd.css';

class MyApp extends App {
  static async getInitialProps(ctx) {
    const { Component } = ctx;
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps, reduxStore, router } = this.props;

    return (
      <Provider store={reduxStore}>
        <Layout router={router}>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    );
  }
}
export default NextHoc(MyApp);
