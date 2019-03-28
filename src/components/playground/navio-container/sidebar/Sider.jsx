import React from 'react';
import { arrayMove } from 'react-sortable-hoc';
import { connect } from 'react-redux';
import SortableList from './SortableList';
import { changeCheckStatus, updateAttribute, changeTypeStatus, toggleSettingsVisible, setAttributes } from './../../../../actions';
import './card.css';

const SortableComponent = ({ attributes, reorderAttributes }) => {
  const onSortEnd = ({ oldIndex, newIndex }) => {
    if (oldIndex !== newIndex) {
      let copy = [...attributes];
      let newArr = arrayMove(copy, oldIndex, newIndex);
      reorderAttributes(newArr);
    }
  }
  return (
    <SortableList
      attributes={attributes}
      onSortEnd={onSortEnd}
    />
  );
};

const mapStateToProps = state => ({
  attributes: state.shipyard.attributes,
});

const mapDispatchToProps = dispatch => ({
  changeCheckStatus: (att, status) => {
    dispatch(changeCheckStatus(att, status));
    dispatch(updateAttribute());
  },
  changeTypeStatus: (att, value) => {
    dispatch(changeTypeStatus(att, value));
    dispatch(updateAttribute());
  },
  toggleVisible: (index, visible) => {
    dispatch(toggleSettingsVisible(index, visible));
  },
  reorderAttributes: (atts) => {
    dispatch(setAttributes(atts));
    dispatch(updateAttribute());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SortableComponent);
