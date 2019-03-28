import React, { Component } from 'react';
import { connect } from 'react-redux';
import { scaleOrdinal, scaleLinear, scaleTime } from 'd3-scale';
import { select } from 'd3-selection';
import ActionGroup from './ActionGroup';
import Side from './sidebar/Sider';
import { updateAttribute, updateFilteredData } from './../../../actions';
import './sidebar.css';
import * as d3ScaleChromatic from "d3-scale-chromatic";

// import navio from '../../../navio.js';
import navio from 'navio';

const cat = 'CATEGORICAL';
const dat = 'DATE';
const text = 'TEXT';
const bool = 'BOOLEAN';
const div = 'DIVERGENT';
const seq = 'SEQUENTIAL';

class NavioContainer extends Component {
  componentDidMount() {
    this.setupNavio();
  }
  componentDidUpdate() {
    const { updated, updateAttribute } = this.props;
    if (updated) {
      this.deleteWidget();
      updateAttribute();
      this.setupNavio();
    }
  }
  deleteWidget() {
    var myNode = document.getElementById("vis");
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
  }
  getScaleOrdinalScheme = (scheme) => {
    switch(scheme) {
      case 'scheme10':
        return scaleOrdinal(d3ScaleChromatic.schemeCategory10);
      default:
        return scaleOrdinal(d3ScaleChromatic.schemeCategory10);
    }
  }
  getScaleOrdinalColor = (color) => {
    switch (color) {
      case 'blue':
        return scaleOrdinal(d3ScaleChromatic.schemeBlues);
      case 'purple':
        return scaleOrdinal(d3ScaleChromatic.schemePurples);
      case 'red':
        return scaleOrdinal(d3ScaleChromatic.schemeReds);
      case 'green':
        return scaleOrdinal(d3ScaleChromatic.schemeGreens);
      case 'gray':
        return scaleOrdinal(d3ScaleChromatic.schemeGreys);
      case 'orange':
        return scaleOrdinal(d3ScaleChromatic.schemeOranges);
      default:
        return scaleLinear(d3ScaleChromatic.schemeOranges);

    }
  }
  getScaleTimeColor = (color) => {
    switch (color) {
      case 'blue':
        return scaleTime(d3ScaleChromatic.schemeBlues);
      case 'purple':
        return scaleTime(d3ScaleChromatic.schemePurples);
      case 'red':
        return scaleTime(d3ScaleChromatic.schemeReds);
      case 'green':
        return scaleTime(d3ScaleChromatic.schemeGreens);
      case 'gray':
        return scaleTime(d3ScaleChromatic.schemeGreys);
      case 'orange':
        return scaleTime(d3ScaleChromatic.schemeOranges);
      default:
        return scaleTime(d3ScaleChromatic.schemeGreys);
    }
  }
  setupNavio = () => {
    let nn = navio(select(this.target), 600).updateCallback(this.props.updateFilteredData);
    for (var i = 0; i < this.props.attributes.length; i++) {
        let d = this.props.attributes[i];
        if (d.checked) {
          switch (d.type) {
            case cat:
              nn.addCategoricalAttrib(d.name);
              break;
            case text:
              nn.addTextAttrib(d.name);
              break;
            case bool:
              nn.addBooleanAttrib(d.name);
              break;
            case div:
              nn.addDivergingAttrib(d.name);
              break;
            case dat:
              nn.addDateAttrib(d.name);
              break;
            case seq:
              nn.addSequentialAttrib(d.name);
              break;
            default:
              nn.addTextAttrib(d.name);
          }
      }
    }
    nn.data(this.props.data);
  }

  render () {
    const { showSidebar } = this.props;
    const sidebarStyles = ['sidebar'];
    const visStyles = ['vis'];

    if (!showSidebar) {
      sidebarStyles.push('hide');
      visStyles.push('vis--hide');
    }
    return (
      <div>
        <ActionGroup />
        <div className="container-vis">
          <div className={ sidebarStyles.join(' ') }>
            <Side  />
          </div>
          <div className={ visStyles.join(' ') }>
            <div
              id="vis"
              ref={ target => this.target = target }
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  showSidebar: state.ui.showSidebar,
  attributes: state.shipyard.attributes,
  data: state.shipyard.data,
  updated: state.shipyard.updated,
});

const mapDispatchToProps = dispatch => ({
  updateAttribute: () => dispatch(updateAttribute()),
  updateFilteredData: data => dispatch(updateFilteredData(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(NavioContainer);
