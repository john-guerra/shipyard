import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button, Icon, Select, Tooltip, Switch } from 'antd';
import { toggleSettingsVisible, changeTypeStatus, changeCheckStatus, updateAttribute } from './../../../../actions';
import './attribute.css';

const { Option, OptGroup } = Select;
class Attribute extends Component {
  state = {
    checked: this.props.checked,
  }
  render () {
    const { toggleVisible, changeCheckStatus, changeTypeStatus, attribute } = this.props;
    console.log(attribute.alias);
    const ico = 'down';
    return (
      <Row type="flex" align="middle" className="attribute">
        <Col span={2}>
          <Tooltip
            placement="right"
            title="Change color and alias"
          >
            <Button shape="circle" size="small" onClick={() => {
                this.setState({ visible: !attribute.__visible });
                toggleVisible(attribute.__id, !attribute.__visible);
              }}
            >
              <Icon type={ico} className={`down ${attribute.__visible ? 'down--rotated' : ''}`} />
            </Button>
          </Tooltip>
        </Col>
        <Col span={10} className="truncate">{ attribute.alias }</Col>
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
});

export default connect(null, mapDispatchToProps)(Attribute);
