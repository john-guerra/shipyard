import React from 'react';
import { connect } from 'react-redux';
import { SortableContainer } from 'react-sortable-hoc';
import SortableItem from './SortableItem';

const SortableList = SortableContainer(({ items }) => (
  <ul>
    {items.map((attribute, index) => (
      <SortableItem key={`item-${index}`} index={index} number={index} attribute={attribute} />
    ))}
  </ul>
));

const mapStateToProps = state => ({
  items: state.shipyard.attributes,
});

export default connect(mapStateToProps)(SortableList);
