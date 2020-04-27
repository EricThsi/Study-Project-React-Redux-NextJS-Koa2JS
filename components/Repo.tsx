import React from 'react';
import Link from 'next/link';

const getLicense = (license) => (license ? `${license.spdx_id} license` : '');

const Repo = ({ repo }) => {
  return (
    <div className='repo-wrapper'>
      <style jsx>{`
        .repo-wrapper {
          display: flex;
          justify-content: space-between;
        }

        .repo-wrapper + .repo-wrapper {
          border-top: 1px solid #eee;
          padding-top: 20px;
        }

        .repo-title {
          font-size: 20px;
        }

        .lang-star {
          display: flex;
        }

        .lang-star > span {
          width: 120px;
          text-align: right;
        }
      `}</style>
      <div className='basic-info'>
        <h3 className='repo-title'>
          <Link href={`/detail?owner=${repo.owner.login}&name=${repo.name}`}>
            <a>{repo.name}</a>
          </Link>
        </h3>
        <p className='repo-desc'>{repo.description}</p>
        <p className='other-info'>
          <span className='license'>{getLicense(repo.license)}</span>
          <span className='last-updated'>{repo.updated_at}</span>{' '}
          <span className='open-issue'>
            {repo.open_issues_count} open issues
          </span>
        </p>
      </div>
      <div className='lang-star'>
        <span className='lang'>{repo.language}</span>
        <span className='stars'>{repo.stargazers_count} </span>
      </div>
    </div>
  );
};

export default Repo;
