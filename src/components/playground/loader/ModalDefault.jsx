import React from 'react';
import { connect } from 'react-redux';
import { Button, Modal, Card, Row, Col } from 'antd';
import { showModal, handleOk, setData, toggleLoading, toggleDataLoaded, setComponentClasses } from './../../../actions';
import * as d3 from 'd3';
import './modal.css';

const ModalDefault = ({ visible, datasets, confirmLoading, showModal, handleOk, handleCancel, setData, toggleLoading, toggleDataLoaded, setComponentClasses }) => {
  const pathDataset = 'https://raw.githubusercontent.com/john-guerra/shipyard/master/public/datasets/';
  const handleDataset = (name) => {
    toggleLoading();
    d3.csv(`${pathDataset}${name}`).then((data) => {
      setData(data);
      setComponentClasses(Object.keys(data[0]));
      toggleLoading();
      toggleDataLoaded();
      handleCancel();
    }).catch(err => {
      console.error(err);
    });
  };
  return (
    <div>
      <Button type="primary" ghost onClick={showModal}>Choose one</Button>
      <Modal
        title="Datasets"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width="90%"
        footer={[
          <Button onClick={handleCancel} key="back">Cancel</Button>,
        ]}
      >
        <Row gutter={32}>
          { datasets.map(d => (
            <Col xs={24} sm={12} md={12} lg={8} xl={6} key={d.id}>
              <Card
                onClick={() => handleDataset(d.name)}
                className="hoverable"
                title={d.title}
                style={{ width: '100%', height: '30vh', overflowY: 'scroll', cursor: 'pointer', marginBottom: 32, textAlign: 'center' }}
              >
                <div className="modal__content">
                  <p className="modal__sub">{ d.n_attributes } attributes & { d.size } rows</p>
                  <h2>Description</h2>
                  <p>{ d.description }</p>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Modal>
    </div>
  );
};

const mapStateToProps = state => ({
  visible: state.ui.visible,
  datasets: state.shipyard.datasets,
  confirmLoading: state.ui.confirmLoading,
});

const mapDispatchToProps = dispatch => ({
  showModal: () => dispatch(showModal()),
  handleOk: name => dispatch(handleOk(name)),
  handleCancel: () => dispatch(showModal()),
  setData: (data) => dispatch(setData(data)),
  toggleLoading: () => dispatch(toggleLoading()),
  toggleDataLoaded: () => dispatch(toggleDataLoaded()),
  setComponentClasses: atts => dispatch(setComponentClasses(atts)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalDefault);
