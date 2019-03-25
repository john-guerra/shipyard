import React from 'react';
import { connect } from 'react-redux';
import { Icon } from 'antd';
import './loader.css';

const Loader = ({ loading }) => {
    const status = loading ? 'loader--show' : 'loader--hide';
    return  (
    <div className={status}>
        <Icon type="loading" style={{ fontSize: '64px' }} />
    </div>
    )
}

const mapStateToProps = (state) => ({
    loading: state.ui.loading,
  });

export default connect(mapStateToProps)(Loader);
