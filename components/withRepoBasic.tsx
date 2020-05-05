import React from 'react';
import Link from 'next/link';

import { request } from '../libs/request';
import Repo from './Repo';

const makeQuery = (queryObj) => {
  const query = Object.entries(queryObj)
    .reduce((result, entry) => {
      result.push(entry.join('='));
      return result;
    }, [])
    .join('&');

  return `?${query}`;
};

export default (Comp, type = 'index') => {
  const WithDetail = ({ repoBasic, router, ...rest }) => {
    const query = makeQuery(router.query);
    console.log(repoBasic);
    return (
      <div className='repo'>
        <style jsx>{`
          .repo-basic {
            padding: 20px;
            border: 1px solid #eee;
            margin-bottom: 20px;
            border-radius: 5px;
          }

          .tab + .tab {
            margin-left: 20px;
          }
        `}</style>
        <div className='repo-basic'>
          <Repo repo={repoBasic} />
          <div className='tabs'>
            {type === 'index' ? (
              <span className='tab'>Readme</span>
            ) : (
              <Link href={`/detail/index${query}`}>
                <a className='tab index'>Readme</a>
              </Link>
            )}
            {type === 'issues' ? (
              <span className='tab'>Issues</span>
            ) : (
              <Link href='/detail/issues'>
                <a className='tab issues'>Issues</a>
              </Link>
            )}
          </div>
        </div>
        <div>
          <Comp {...rest} />
        </div>
      </div>
    );
  };

  WithDetail.getInitialProps = async (context) => {
    const { router, ctx } = context;
    const { owner, name } = ctx.query;
    const repoBasic = await request(
      {
        url: `/repos/${owner}/${name}`,
      },
      ctx.req,
      ctx.res
    );

    let pageData = {};

    if (Comp.getInitialProps) {
      pageData = await Comp.getInitialProps(context);
    }

    return {
      repoBasic: repoBasic.data,
      ...pageData,
    };
  };

  return WithDetail;
};
