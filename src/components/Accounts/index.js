import React from 'react';
import { connect } from 'react-redux';
import { selectAccounts } from '../../selectors/accounts';
import Account from '../Account';
import AddPortfolioGroup from './AddPortfolioGroup';

const Accounts = ({ accounts }) => {
  if (!accounts || accounts.length === 0) {
    return null;
  }

  accounts.sort((a, b) => {
    if (a.number < b.number) {
      return -1;
    }
    if (a.number > b.number) {
      return 1;
    }
    return 0;
  });

  return (
    <React.Fragment>
      {accounts.map(account => (
        <Account key={account.id} account={account} />
      ))}
      <AddPortfolioGroup />
    </React.Fragment>
  );
};

const select = state => ({
  accounts: selectAccounts(state),
});

export default connect(select)(Accounts);