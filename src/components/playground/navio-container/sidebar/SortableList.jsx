import React from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import SortableItem from './SortableItem';

const SortableList = SortableContainer(({ attributes }) => (
  <ul>
    {attributes.map(attr => (
      <SortableItem
        key={attr.__id}
        index={attr.__id}
        attribute={attr}
      />
    ))}
  </ul>
));

export default SortableList;
