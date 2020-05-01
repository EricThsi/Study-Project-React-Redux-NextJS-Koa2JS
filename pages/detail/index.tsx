import React from 'react';
import Link from 'next/link';
import withRouter from 'next/router';

import { request } from '../../libs/request';
import Repo from '../../components/Repo';

// interface IDetailProps {}

const makeQuery = (queryObj) => {
  const query = Object.entries(queryObj)
    .reduce((result, entry) => {
      result.push(entry.join('='));
      return result;
    }, [])
    .join('&');

  return `?${query}`;
};

const Detail = ({ repoBasic, router }) => {
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
          <Link href={`/detail/issues${query}`}>
            <a className='tab issues'>Issues</a>
          </Link>
        </div>
      </div>
      <div>Readme</div>
    </div>
  );
};

Detail.getInitialProps = async ({ router, ctx }) => {
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

export default Detail;
