import React from 'react';
import { Row, Col } from 'antd';
import { connect } from 'react-redux';
import Loader from './loader/Loader';
import NavioContainer from './navio-container/NavioContainer';
import Sample from './sample-data/Sample';


const Playground = ({ dataLoaded, showSidebar }) => {
  return (
    <div style={{ height: '100%' }}>
      <div>
        { dataLoaded ?
          <Row type="flex" justify="space-around">
            <Col span={12}>
              <NavioContainer />
            </Col>
            <Col span={12} style={{ marginTop: '40px' }}>
              <Sample />
            </Col>
          </Row>
          :
          <Loader />
        }
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  dataLoaded: state.ui.dataLoaded,
  showSidebar: state.ui.showSidebar,
});

export default connect(mapStateToProps)(Playground);
