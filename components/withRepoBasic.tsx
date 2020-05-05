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

export default (Comp) => {
  const WithDetail = ({ repoBasic, router }) => {
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
            <Link href={`/detail${query}`}>
              <a className='tab index'>Readme</a>
            </Link>
            <Link href='/detail/issues'>
              <a className='tab issues'>Issues</a>
            </Link>
          </div>
        </div>
        <div>
          <Comp />
        </div>
      </div>
    );
  };

  WithDetail.getInitialProps = async ({ router, ctx }) => {
    const { owner, name } = ctx.query;
    const repoBasic = await request(
      {
        url: `/repos/${owner}/${name}`,
      },
      ctx.req,
      ctx.res
    );

    return {
      repoBasic: repoBasic.data,
    };
  };

  return WithDetail;
};
