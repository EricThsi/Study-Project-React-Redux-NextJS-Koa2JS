import React from 'react';
import { withRouter } from 'next/router';

const Search = ({ router }) => <div>{router.query.q}</div>;

export default withRouter(Search);
