import MarkdownIt from 'markdown-it';

import WithRepoBasic from '../../components/withRepoBasic';
import { request } from '../../libs/request';

const md = new MarkdownIt();

const Detail = ({ readme }) => {
  const content = atob(readme.content);
  const html = md.render(content);

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
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
