import React from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import SortableItem from './SortableItem';

const SortableList = SortableContainer(({ attributes }) => (
  <ul>
    {attributes.map((attribute, index) => (
      <SortableItem
        key={`item-${index}`}
        index={index}
        number={index}
        attribute={attribute}
      />
    ))}
  </ul>
));

export default SortableList;
