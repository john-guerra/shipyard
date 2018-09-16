import React, { Component } from 'react';

import { Row, Col } from 'antd';
import { connect } from 'react-redux';
import * as d3 from 'd3';
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
        return d3.scaleOrdinal(d3ScaleChromatic.schemeCategory10);
      // John: removed them because they don't exist anymore
      // case 'scheme20':
      //   return d3.scaleOrdinal(d3ScaleChromatic.schemeCategory20);
      // case 'scheme20b':
      //   return d3.scaleOrdinal(d3ScaleChromatic.schemeCategory20b);
      // case 'scheme20c':
      //   return d3.scaleOrdinal(d3ScaleChromatic.schemeCategory20c);
      default:
        //scheme 10 default
        return d3.scaleOrdinal(d3ScaleChromatic.schemeCategory10);
    }
  }
  getScaleOrdinalColor = (color) => {
    switch (color) {
      case 'blue':
        return d3.scaleOrdinal(d3ScaleChromatic.schemeBlues);
      case 'purple':
        return d3.scaleOrdinal(d3ScaleChromatic.schemePurples);
      case 'red':
        return d3.scaleOrdinal(d3ScaleChromatic.schemeReds);
      case 'green':
        return d3.scaleOrdinal(d3ScaleChromatic.schemeGreens);
      case 'gray':
        return d3.scaleOrdinal(d3ScaleChromatic.schemeGreys);
      case 'orange':
        return d3.scaleOrdinal(d3ScaleChromatic.schemeOranges);
      default:
        // purple
        console.log('default', color);
        return d3.scaleLinear(d3ScaleChromatic.schemeOranges);

    }
  }
  getScaleTimeColor = (color) => {
    switch (color) {
      case 'blue':
        return d3.scaleTime(d3ScaleChromatic.schemeBlues);
      case 'purple':
        return d3.scaleTime(d3ScaleChromatic.schemePurples);
      case 'red':
        return d3.scaleTime(d3ScaleChromatic.schemeReds);
      case 'green':
        return d3.scaleTime(d3ScaleChromatic.schemeGreens);
      case 'gray':
        return d3.scaleTime(d3ScaleChromatic.schemeGreys);
      case 'orange':
        return d3.scaleTime(d3ScaleChromatic.schemeOranges);
      default:
        // purple
        console.log('default!!!!!!!!!!!!!!!!!')
        // color = null;
        return d3.scaleTime(d3ScaleChromatic.schemeGreys);
    }
  }
  setupNavio = () => {
    this.nn = new navio(d3.select(this.target), 600).updateCallback(this.props.updateFilteredData);
    for (var i = 0; i < this.props.attributes.length; i++) {
        let d = this.props.attributes[i];
        console.log(d);
        if (d.checked) {
          let color;
          switch (d.type) {
            case cat:
              color = this.getScaleOrdinalScheme(d.color);
              console.log(d.name, color)
              this.nn.addCategoricalAttrib(d.name);
              break;
            default:
              if (d.data === dat) {
                console.log('is date',d.color);
                color = this.getScaleTimeColor(d.color);

                console.log(d.name, color)
                // this.nn.addSequentialAttrib(d.name);
                this.nn.addSequentialAttrib(d.name,
                        d3.scalePow()
                          // .exponent(0)
                          .range([d3ScaleChromatic.interpolatePurples(0), d3ScaleChromatic.interpolatePurples(1)]))
                break;
              }
              else {
                  color = this.getScaleOrdinalColor(d.color);
                  console.log(d.name, color)
                  this.nn.addSequentialAttrib(d.name);
                   // this.nn.addSequentialAttrib(d.name,
                   //      d3.scalePow()
                   //        .exponent(0.25)
                   //        .range([d3ScaleChromatic.interpolatePurples(0), d3ScaleChromatic.interpolatePurples(1)]))

                  break;
              }

          }
      }
    }
    this.nn.data(this.props.data);
  }
  setupNavio2 = () => {
    this.nn = new navio(d3.select(this.target), 600).updateCallback(this.props.updateFilteredData);
    for (var i = 0; i < this.props.attributes.length; i++) {
        let d = this.props.attributes[i];
            if (d.checked) {
        if (d.type === cat) {
          this.nn.addCategoricalAttrib(d.name,
            d3.scaleOrdinal(d3.schemeCategory10));
        } else if (d.type === seq) {
          if (d.data === 'date') {
            this.nn.addSequentialAttrib(d.name,
              d3.scaleTime(d3ScaleChromatic.schemeBlues))
                // .domain(d.min, d.max)
                // .range([d3ScaleChromatic.interpolatePurples(0), d3ScaleChromatic.interpolatePurples(1)]))
          }
          else {
            console.log(d3)
            console.log(d3ScaleChromatic)
            this.nn.addSequentialAttrib(d.name)
              // d3.scaleLinear()
              //   // .base(Math.E)
              //   .domain(d.min, d.max)
              //   .range([0,600]))
          }
        }
      }
    }
    this.nn.data(this.props.data);
  };
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
