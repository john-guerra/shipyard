import { SHOW_MODAL, TOGGLE_LOADING, TOGGLE_DATA_LOADED, RESET_DATA, TOGGLE_SIDEBAR, HIDE_ATTRIBUTE, SHOW_ATTRIBUTE, SET_COMPONENT_CLASSES, SWAP_COMPONENT_CLASSES } from './../actions/index';

const initialState = {
  confirmLoading: false,
  closed: true,
  loading: false,
  visible: false,
  dataLoaded: false,
  showSidebar: false,
};
const ui = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_MODAL:
      return Object.assign({}, state, {
        visible: !state.visible,
      });
    case TOGGLE_LOADING:
      return Object.assign({}, state, {
        loading: !state.loading,
      });
    case TOGGLE_DATA_LOADED:
      return Object.assign({}, state, {
        dataLoaded: !state.dataLoaded,
      });
    case RESET_DATA:
      return initialState;
    case TOGGLE_SIDEBAR:
      return Object.assign({}, state, {
        showSidebar: !state.showSidebar,
      });
    case HIDE_ATTRIBUTE:
      return Object.assign({}, state, {
        attributes: state.attributes.map(attr => {
          if (action.index === attr.__id) {
            attr.__visible = false;
          }
          return attr;
        })
      });
    case SHOW_ATTRIBUTE:
      return Object.assign({}, state, {
        attributes: state.attributes.map(attr => {
          if (action.index === attr.__id) {
            attr.__visible = true;
          }
          return attr;
        })
      })
    case SET_COMPONENT_CLASSES:
      let array = [];
      action.attributes.forEach((d, k)=> {
        let i = {};
        i.classes = ['box', 'hide'];
        i.index = k;
        array.push(i);
      })
      return Object.assign({}, state, {
        componentClasses: array,
      })
    default:
      return state;
  }
};

export default ui;
