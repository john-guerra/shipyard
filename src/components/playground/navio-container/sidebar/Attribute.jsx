import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button, Icon, Select, Tooltip, Switch } from 'antd';
import { toggleSettingsVisible, changeTypeStatus, changeCheckStatus, updateAttribute, addComponentClass, deleteLastComponentClass } from './../../../../actions';
import './attribute.css';

const { Option, OptGroup } = Select;
class Attribute extends Component {
  componentDidMount(){
  }
  componentDidUpdate(){
  }
  state = {
    checked: this.props.checked,
    settings: this.props.settings,
  }
  render () {
    const { index, attribute, toggleVisible, changeCheckStatus, changeTypeStatus, addComponentClass, deleteLastComponentClass } = this.props;
    const ico = attribute.settings ? 'up' : 'setting';
    return (
      <Row type="flex" align="middle" className="attribute">
        <Col span={2}>
          <Button shape="circle" size="small" onClick={() => {
              this.setState({settings: !attribute.settings});
              toggleVisible(index, !attribute["settings"]);
              if (attribute.settings) {
                deleteLastComponentClass(index);
              } else {
                addComponentClass('hide', index);
              }
            }}
          >
            <Icon type={ico} />
          </Button>
        </Col>
        <Col span={10} className="truncate">{ attribute.name }</Col>
        <Col span={8}>
          <Select
            size="small"
            style={{ width: '100%' }}
            dropdownMatchSelectWidth={false}
            value={attribute.type}
            onChange={value => changeTypeStatus(attribute, value)}
          >
            <OptGroup label="unordered">
              <Option value="CATEGORICAL">CATEGORICAL</Option>
            </OptGroup>
            <OptGroup label="ordered">
              <Option value="ORDINAL">ORDINAL</Option>
              <Option value="SEQUENTIAL">SEQUENTIAL</Option>
              <Option value="DATE">DATE</Option>
            </OptGroup>
          </Select>
        </Col>
        <Col span={2}>
          <Tooltip placement="right" title="Here you can change this dimension visibility">
            <Switch size="small" defaultChecked={true} checked={attribute.checked} style={{ marginLeft: '2em' }} onChange={checked => { console.log(checked);this.setState({checked}); changeCheckStatus(attribute, checked);}} />
          </Tooltip>
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = (state, param) => ({
  attribute: state.shipyard.attributes[param.index],
  index: param.index,
});

const mapDispatchToProps = dispatch => ({
  toggleVisible: (index, visible) => {
    dispatch(toggleSettingsVisible(index, visible));
  },
  changeTypeStatus: (att, value) => {
    dispatch(changeTypeStatus(att, value));
    dispatch(updateAttribute());
  },
  changeCheckStatus: (att, status) => {
    dispatch(changeCheckStatus(att, status));
    dispatch(updateAttribute());
  },
  deleteLastComponentClass: index => dispatch(deleteLastComponentClass(index)),
  addComponentClass: (className, index) => dispatch(addComponentClass(className, index)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Attribute);
