import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { connect } from 'react-redux';
import { scaleOrdinal, scaleLinear, scaleTime, scalePow } from 'd3-scale';
import { select } from 'd3-selection';
import ActionGroup from './ActionGroup';
import Side from './sidebar/Sider';
import { updateAttribute, updateFilteredData } from './../../../actions';
import './sidebar.css';
import * as d3ScaleChromatic from "d3-scale-chromatic";
import navio from 'navio';
const cat = 'CATEGORICAL';
const seq = 'SEQUENTIAL';
const dat = 'DATE';
const ord = 'ORDINAL';
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
    this.nn = navio(select(this.target), 600).updateCallback(this.props.updateFilteredData);
    for (var i = 0; i < this.props.attributes.length; i++) {
        let d = this.props.attributes[i];
        if (d.checked) {
          let color;
          switch (d.type) {
            case cat:
              color = this.getScaleOrdinalScheme(d.color);
              this.nn.addCategoricalAttrib(d.name);
              break;
            default:
              if (d.data === dat) {
                color = this.getScaleTimeColor(d.color);
                this.nn.addSequentialAttrib(d.name,
                        scalePow()
                          .range([d3ScaleChromatic.interpolatePurples(0), d3ScaleChromatic.interpolatePurples(1)]))
                break;
              }
              else {
                  color = this.getScaleOrdinalColor(d.color);
                  this.nn.addSequentialAttrib(d.name);
                  break;
              }

          }
      }
    }
    this.nn.data(this.props.data);
  }

  render () {
    const { showSidebar } = this.props;
    const sidebarStyles = ['sidebar'];
    if (!showSidebar) {sidebarStyles.push('hide')}
    return (
      <div>
        <ActionGroup />
        <Row>
          <Col span={10} className={sidebarStyles.join(' ')}>
            <Side />
          </Col>
          <Col span={showSidebar ? 14 : 24}>
            <div
              style={{ width: '100%', overflowX: 'scroll', minHeight: '700px' }}
              id="vis"
              ref={(target) => this.target = target }
            />
          </Col>
        </Row>
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
