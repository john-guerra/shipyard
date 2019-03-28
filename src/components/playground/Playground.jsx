import React from 'react';
import { Row, Col } from 'antd';
import { connect } from 'react-redux';
import Loader from './loader/Loader';
import NavioContainer from './navio-container/NavioContainer';
import Sample from './sample-data/Sample';


const Playground = ({ dataLoaded, showSidebar }) => {
  const span = showSidebar ? 24 : 12;
  return (
    <div style={{ height: '100%', margin: '0px 16px'}}>
      <div>
        {
          dataLoaded ?
          <Row gutter={16}>
            <Col span={span}>
              <NavioContainer />
            </Col>
            <Col span={span}>
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
