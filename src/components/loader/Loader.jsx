import React from 'react';
import { connect } from 'react-redux';
import { Icon } from 'antd';
import './loader.css';

const Loader = ({ loading }) => {
    const status = loading ? 'show' : 'hide';
    return  (
    <div className={status}>
        <Icon type="loading" />
    </div>
    )
}

const mapStateToProps = (state) => ({
    loading: state.ui.loading,
  });

export default connect(mapStateToProps)(Loader);
