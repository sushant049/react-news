import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Spin  } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
const antIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />;

class Loader extends Component {
  render() {
    let {isLoading} = this.props;
    return (
      <div className="pageLoader" hidden={!isLoading}>
        <Spin indicator={antIcon} tip="Latest news are on the way..."/>
      </div>
    )
  }
}

const mapStateToProps = ({news}) => ({
  isLoading: news.loading
});

export default connect(mapStateToProps)(Loader);