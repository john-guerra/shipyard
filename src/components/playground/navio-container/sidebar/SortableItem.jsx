import React from 'react';
import { connect } from 'react-redux';
import { setAlias } from './../../../../actions';
import { SortableElement } from 'react-sortable-hoc';
import { Input, Divider, Icon } from 'antd';
import Attribute from './Attribute';
import './sortableItem.css';

const SortableItem = SortableElement(({ attribute, setAlias }) => (
    <div className="sortableItem">
      <Attribute attribute={attribute} />
      <div className={`box ${attribute.__visible ? '' : 'hide' }`}>
        <div className="settings">
          <div></div>
          <div>
            <hr />
            <div className="color">
              <div>
                <div>
                  color
                </div>
              </div>
              <div>
                {/* <ColorPicker type={attribute.type} name={attribute.name} /> */}
              </div>
            </div>
            <hr />
            <div className="alias">
              <div>
                alias
              </div>
              <div>
                <Input
                  size="small"
                  addonAfter={[<Icon key={attribute.name} style={{ color: 'blue' }} type="check" />, <Divider key={attribute.name +'1'} type="vertical" />, <Icon key={attribute.name+'2'} style={{ color: 'red' }} type="delete"/>]}
                  defaultValue={attribute.alias}
                  onChange={(e) => setAlias(e.target.value, attribute.__id)}
                />
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
));

const mapStateToProps = state => ({
  attributes: state.shipyard.attributes
});

const mapDispatchToProps = dispatch => ({
  setAlias: (alias, index) => {
    dispatch(setAlias(alias, index));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SortableItem);
