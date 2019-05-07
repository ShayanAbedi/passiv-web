import React from 'react';
import { connect } from 'react-redux';
import AuthorizationPicker from '../components/AuthorizationPicker';

import { H3 } from '../styled/GlobalElements';
import styled from '@emotion/styled';

export const Order = styled.div`
  text-align: center;
  select {
    background: #fff;
    padding: 10px;
    margin: 12px 0;
  }
`;

export const LeftOrder = styled(Order)`
  text-align: left;
`;

class ConnectionUpdate extends React.Component {
  state = {
    allowSelectType: this.props.type === undefined ? true : false,
    defaultType:
      this.props.type === undefined
        ? this.props.authorization.type
        : this.props.type,
  };

  render() {
    const { authorization } = this.props;
    const picker = (
      <React.Fragment>
        {!this.props.hideTitle && <H3>Update/Refresh Connection</H3>}
        <AuthorizationPicker
          allowSelectBrokerage={false}
          brokerage={authorization.brokerage.id}
          updateBrokerageAuthorizationId={authorization.id}
          allowSelectType={this.state.allowSelectType}
          type={this.state.defaultType}
          name={this.props.name}
        />
      </React.Fragment>
    );
    if (this.props.align && this.props.align === 'left') {
      return <LeftOrder>{picker}</LeftOrder>;
    } else {
      return <Order>{picker}</Order>;
    }
  }
}

const select = state => ({});

const actions = {};

export default connect(
  select,
  actions,
)(ConnectionUpdate);
