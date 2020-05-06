import dynamic from 'next/dynamic';

import WithRepoBasic from '../../components/withRepoBasic';
import { request } from '../../libs/request';

const MarkdownRender = dynamic(() => import('../../components/MarkdownRender'));

const Detail = ({ readme }) => {
  return <MarkdownRender content={readme.content} isBase64 />;
};

Detail.getInitialProps = async ({
  ctx: {
    query: { owner, name },
    req,
    res,
  },
}) => {
  const readmeRes = await request(
    {
      url: `/repos/${owner}/${name}/readme`,
    },
    req,
    res
  );

  return {
    readme: readmeRes.data,
  };
};
export default WithRepoBasic(Detail);
