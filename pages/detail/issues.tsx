import WithRepoBasic from '../../components/withRepoBasic';

const Issues = ({ text }) => {
  return <span>Issues Index, {text} </span>;
};

Issues.getInitialProps = async () => ({ text: 123 });

export default WithRepoBasic(Issues, 'issues');
