import WithRepoBasic from '../../components/withRepoBasic';
import MarkdownRender from '../../components/MarkdownRender';
import { request } from '../../libs/request';

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
