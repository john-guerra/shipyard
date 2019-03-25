import React from 'react';
import { connect } from 'react-redux';
import { SortableElement } from 'react-sortable-hoc';
import { Input, Divider, Icon } from 'antd';
import Attribute from './Attribute';
import ColorPicker from './ColorPicker';
import './sortableItem.css';

const SortableItem = SortableElement(({ attribute, number, componentClasses, setColor, toggleColorVisible }) => (
    <div className="sortableItem" style={{ padding: '0.25em', backgroundColor: 'white', marginBottom: '0em', cursor: 'move', borderRadius: '2px'}}>
      <Attribute attribute={attribute} index={number} />
      <div className={componentClasses.join(' ')}>
        <div className="settings">
          <hr />
          <div className="color">
            <div>
              <div>
                color
              </div>
            </div>
            <div>
              <ColorPicker type={attribute.type} name={attribute.name} />
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
              />
            </div>
          </div>
        </div>
      </div>
    </div>
));

const mapStateToProps = (state, props) => ({
  componentClasses: state.ui.componentClasses[props.number].classes,
  number: props.number,
  attribute: state.shipyard.attributes[props.number],
});

export default connect(mapStateToProps)(SortableItem);
