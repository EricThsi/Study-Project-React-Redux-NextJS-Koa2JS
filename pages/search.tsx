import React, { useCallback, isValidElement } from 'react';
import { Row, Col, List, Pagination } from 'antd';
import Router, { withRouter } from 'next/router';
import Link from 'next/link';

import Repo from '../components/Repo';

const { request } = require('../libs/request');

const LANGUAGES = ['JavaScript', 'HTML', 'CSS', 'React'];
const SORT_TYPES = [
  {
    name: 'Best Match',
  },
  {
    name: 'Most Stars',
    value: 'stars',
    order: 'desc',
  },
  {
    name: 'Fewest Stars',
    value: 'stars',
    order: 'asc',
  },
  {
    name: 'Most Forks',
    value: 'forks',
    order: 'desc',
  },
  {
    name: 'Fewest Forks',
    value: 'forks',
    order: 'asc',
  },
];

const PER_PAGE = 20;

const selectedItemStyle = {
  borderLeft: '2px solid red',
  fontWeight: 100,
};

const noop = () => {};

const FilterLink = ({ name, q, lang, sort, order, page }) => {
  let queryString = `?q=${q}`;

  if (lang) {
    queryString += `+language:${lang}`;
  }

  if (sort) {
    queryString += `&sort=${sort}&order=${order || 'desc'}`;
  }

  if (page) {
    queryString += `&page=${page}`;
  }

  queryString += `&per_page=${PER_PAGE}`;
  console.log(queryString);

  return (
    <Link href={`/search${queryString}`}>
      {isValidElement(name) ? name : <a>{name}</a>}
    </Link>
  );
};

const Search = ({ router, repos }) => {
  const { ...queryParams } = router.query;
  const { lang, sort, order, page } = router.query;

  return (
    <div className='search-wrapper'>
      <Row gutter={20}>
        <Col span={6}>
          <List
            bordered
            header={<span className='list-header'>Language</span>}
            dataSource={LANGUAGES}
            renderItem={(item, index) => {
              const selected = lang === item;
              return (
                <List.Item
                  key={index}
                  style={selected ? selectedItemStyle : null}
                >
                  {selected ? (
                    <span>{item}</span>
                  ) : (
                    <FilterLink {...queryParams} lang={item} name={item} />
                  )}
                </List.Item>
              );
            }}
          />
          <List
            bordered
            header={<span className='list-header'>Sort</span>}
            dataSource={SORT_TYPES}
            renderItem={(item, index) => {
              let selected = false;

              if (item.name === 'Best Match' && !sort) {
                selected = true;
              } else if (item.value === sort && item.order === order) {
                selected = true;
              }

              return (
                <List.Item
                  key={index}
                  style={selected ? selectedItemStyle : null}
                >
                  {selected ? (
                    <span>{item.name}</span>
                  ) : (
                    <FilterLink
                      {...queryParams}
                      sort={item.value}
                      order={item.order}
                      name={item.name}
                    />
                  )}
                </List.Item>
              );
            }}
          />
        </Col>
        <Col span={18}>
          <h3 className='repo-title'>{repos.total_count} repos</h3>
          {repos.items.map((repo) => (
            <Repo repo={repo} key={repo.id} />
          ))}
          <div className='pagination'>
            <Pagination
              pageSize={PER_PAGE}
              current={Number(page) || 1}
              total={repos.total_count}
              onChange={noop}
              itemRender={(page, type, ol) => {
                const p =
                  type === 'page'
                    ? page
                    : type === 'prev'
                    ? page - 1
                    : page + 1;
                const name = type === 'page' ? page : ol;

                return <FilterLink {...queryParams} page={p} name={name} />;
              }}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

Search.getInitialProps = async ({ ctx }) => {
  const { req, res } = ctx;
  const { q, sort, lang, order, page } = ctx.query;

  if (!q) {
    return {
      repos: {
        total_count: 0,
      },
    };
  }

  // ?q=react+language:javascript&sort=stars&order=desc&page=2
  let queryString = `?q=${q}`;

  if (lang) {
    queryString += `+language:${lang}`;
  }

  if (sort) {
    queryString += `&sort=${sort}&order=${order || 'desc'}`;
  }

  if (page) {
    queryString += `&page=${page}`;
  }

  queryString += `&per_page=${PER_PAGE}`;

  const result = await request(
    {
      url: `/search/repositories${queryString}`,
    },
    req,
    res
  );

  return {
    repos: result.data,
  };
};

export default withRouter(Search);
