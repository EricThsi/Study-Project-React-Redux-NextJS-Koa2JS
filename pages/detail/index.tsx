import WithRepoBasic from '../../components/withRepoBasic';

const Detail = ({ text }) => {
  return <span>Detail Index, {text} </span>;
};

Detail.getInitialProps = async () => ({ text: 123 });

export default WithRepoBasic(Detail);
