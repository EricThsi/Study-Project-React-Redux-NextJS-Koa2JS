import React, { useState, useCallback } from 'react';
import { Avatar, Button } from 'antd';
import dynamic from 'next/dynamic';

import WithRepoBasic from '../../components/withRepoBasic';
import { request } from '../../libs/request';

const MarkdownRender = dynamic(() => import('../../components/MarkdownRender'));

const IssueDetail = ({ issue }) => {
  return (
    <div className='issue-detail'>
      <MarkdownRender content={issue.body} />
      <div className='actions'>
        <Button href={issue.html_url} target='_blank'>
          Open issue
        </Button>
      </div>
    </div>
  );
};

const IssueItem = ({ issue }) => {
  const [showDetail, setShowDetail] = useState(false);

  const toggleShowDetail = useCallback(() => {
    setShowDetail(!showDetail);
  }, []);

  return (
    <div className='issue'>
      <style jsx>{`
        .issue {
          display: flex;
          position: relative;
          padding: 10px;
        }

        .issue:hover {
          background-color: #fafafa;
        }

        .issue + .issue {
          border-top: 1px solid #eee;
        }

        .issue-info > h6 {
          max-width: 600px;
          font-size: 16px;
          padding-right: 40px;
        }

        .avatar {
          margin-right: 20px;
        }

        .sub-info {
          margin-bottom: 0;
        }

        .sub-info > span + span {
          display: inline-block;
          margin-left: 20px;
          font-size: 12px;
        }
      `}</style>
      <Button
        type='primary'
        size='small'
        style={{
          position: 'absolute',
          top: 10,
          right: 10,
        }}
        onClick={toggleShowDetail}
      >
        {showDetail ? 'Hide' : 'Show'}
      </Button>
      <div className='avatar'>
        <Avatar src={issue.user.avatar_url} shape='square' />
      </div>
      <div className='issue-info'>
        <h6>{issue.title}</h6>

        <p className='sub-info'>
          <span>Updated at {issue.updated_at}</span>
        </p>
        {showDetail && <IssueDetail issue={issue} />}
      </div>
    </div>
  );
};

const Issues = ({ issues }) => {
  return (
    <div className='issues-wrapper'>
      <div className='issues'>
        {issues.map((issue) => (
          <IssueItem issue={issue} key={issue.id} />
        ))}
      </div>
      <style jsx>{`
        .issues {
          border: 1px solid #eee;
          border-radius: 5px;
          margin-bottom: 20px;
          margin-top: 20px;
        }
      `}</style>
    </div>
  );
};

Issues.getInitialProps = async ({ ctx }) => {
  const { owner, name } = ctx.query;

  const issuesRes = await request(
    {
      url: `/repos/${owner}/${name}/issues`,
    },
    ctx.req,
    ctx.res
  );

  return {
    issues: issuesRes.data,
  };
};

export default WithRepoBasic(Issues, 'issues');
