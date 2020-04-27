import App from 'next/app';
import { Provider } from 'react-redux';
import { Router } from 'next/router';

import NextHoc from '../libs/withRedux';
import Layout from '../components/Layout';
import Loading from '../components/Loading';

// import 'antd/dist/antd.css';

import './app.scss';

class MyApp extends App {
  state = {
    loading: false,
  };

  static async getInitialProps(ctx) {
    const { Component } = ctx;
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  startLoading = () => {
    this.setState({
      loading: true,
    });
  };

  stopLoading = () => {
    this.setState({
      loading: false,
    });
  };

  componentDidMount() {
    Router.events.on('routeChangeStart', this.startLoading);
    Router.events.on('routeChangeComplete', this.stopLoading);
    Router.events.on('routeChangeError', this.stopLoading);
  }

  componentWillUnmount() {
    Router.events.off('routeChangeStart', this.startLoading);
    Router.events.off('routeChangeComplete', this.stopLoading);
    Router.events.off('routeChangeError', this.stopLoading);
  }

  render() {
    const { Component, pageProps, reduxStore, router } = this.props;

    return (
      <Provider store={reduxStore}>
        {this.state.loading && <Loading />}
        <Layout router={router}>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    );
  }
}
export default NextHoc(MyApp);
