import { memo, useMemo } from 'react';
import MarkdownIt from 'markdown-it';

// TODO: css loader error
// import 'github-markdown-css';

const md = new MarkdownIt({
  html: true,
  linkify: true,
});

const b64ToUtf8 = (str) => {
  return decodeURIComponent(escape(atob(str)));
};

const MarkdownRender = ({ content, isBase64 = false }) => {
  const markdownContent = isBase64 ? b64ToUtf8(content) : content;
  const html = useMemo(() => md.render(markdownContent), [markdownContent]);

  return (
    <div className='markdown-body'>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
};

export default memo(MarkdownRender);
