import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button, Icon, Select, Tooltip, Switch } from 'antd';
import { toggleSettingsVisible, changeTypeStatus, changeCheckStatus, updateAttribute, addComponentClass, deleteLastComponentClass } from './../../../../actions';
import './attribute.css';

const { Option, OptGroup } = Select;
class Attribute extends Component {
  state = {
    checked: this.props.checked,
    settings: this.props.settings,
    attribute: this.props.attribute,
  }
  render () {
    const { attribute } = this.state;
    const { index, toggleVisible, changeCheckStatus, changeTypeStatus, addComponentClass, deleteLastComponentClass } = this.props;
    const ico = attribute.settings ? 'up' : 'setting';
    return (
      <Row type="flex" align="middle" className="attribute">
        <Col span={2}>
          <Tooltip
            placement="right"
            title="Change color and alias"
          >
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
          </Tooltip>
        </Col>
        <Col span={10} className="truncate">{ attribute.name }</Col>
        <Col span={8}>
          <Tooltip
            placement="bottom"
            title="Change attribute type"
          >
            <Select
              size="small"
              style={{ width: '100%' }}
              dropdownMatchSelectWidth={false}
              value={attribute.type}
              onChange={value => { this.setState({ attribute }); changeTypeStatus(attribute, value);}}
            >
              <OptGroup label="unordered">
                <Option value="CATEGORICAL">Categorical</Option>
                <Option value="TEXT">Text</Option>
                <Option value="BOOLEAN">Boolean</Option>

              </OptGroup>
              <OptGroup label="ordered">
                <Option value="ORDINAL">Ordinal</Option>
                <Option value="SEQUENTIAL">Sequential</Option>
                <Option value="DATE">Date</Option>
                <Option value="DIVERGENT">Divergent</Option>
              </OptGroup>
            </Select>
          </Tooltip>
        </Col>
        <Col span={2}>
          <Tooltip placement="right" title="Here you can hide this attribute in Navio">
            <Switch size="small" defaultChecked={true} checked={attribute.checked} style={{ marginLeft: '2em' }} onChange={checked => { this.setState({checked}); changeCheckStatus(attribute, checked);}} />
          </Tooltip>
        </Col>
      </Row>
    )
  }
}

const mapStateToProps = (_, props) => ({
  index: props.index,
  attribute: props.attribute,
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
