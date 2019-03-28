import React, { Component } from 'react';
import { Select, Button } from 'antd';
import { connect } from 'react-redux';
import * as d3 from 'd3';
import './sortableItem.css';
import { setColor, updateAttribute } from './../../../../actions';

const Option = Select.Option;

class ColorPicker extends Component {
  render(){
    let { setColor, name } = this.props;
    if (this.props.type === 'CATEGORICAL') {
      return Categorical();
    }
    else {
      return SequentialPicker(setColor, name);
    }
  }
}

const Categorical = () => {
  const cat10 = d3.scaleOrdinal(d3.schemeCategory10);
  const arr10 = d3.range(10);
  return (
    <Select size="small" defaultValue="scheme10" className="color-selector">
        <Option value="scheme10">
          <div className="scheme10">
            {
              arr10.map((d,i) => (
                <div key={i+'10'} style={{ width: 20, height: 20, backgroundColor: cat10(d)}}>
                </div>
              ))
            }
          </div>
        </Option>
      </Select>
  );
};

const colors = ["blue", "green", "gray", "orange","purple", "red"];


const SequentialPicker = (setColor, name) => {
  return (
    <div className="sequential-picker">
      { colors.map(d=> (
        <Button key={d} onClick={(click) => setColor(d, name)} shape="circle" style={{ backgroundColor: d }}></Button>
        ))
      }
    </div>

  );
}

const mapStateToProps = (state, ownProps) => ({
  type: ownProps.type,
  name: ownProps.name,
});

const mapDispatchToProps = dispatch => ({
  setColor: (d, click) => {dispatch(setColor(d, click)); dispatch(updateAttribute());},
})

export default connect(mapStateToProps, mapDispatchToProps)(ColorPicker);