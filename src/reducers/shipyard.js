import {
  SET_DATA,
  RESET_DATA,
  CHANGE_CHECK_STATUS,
  CHANGE_TYPE_STATUS,
  UPDATE_ATTRIBUTE,
  UPDATE_FILTERED_DATA,
  TOGGLE_SETTINGS_VISIBLE,
  SET_ATTRIBUTES,
  SET_ATTRIBUTE_COLOR,
  TOGGLE_COLOR_VISIBLE,
  SET_ALIAS,
} from './../actions/index';

const initialState = {
  data: [],
  attributes: [],
  exportData: [],
  source: [],
  updated: false,
  datasets: [
    {
      id: 1,
      title: 'Followers of presidential candidates Colombia 2018',
      description: 'Dataset with information about followers on twitter of the presidential cadidates.',
      name: 'all_followers_id.csv',
      size: 1048575,
      n_attributes: 10,
    },
    {
      id: 2,
      title: 'MoMA Collection',
      description: 'Evolving collection contains almost 130,000 works of modern and contemporary art.',
      name: 'Artworks_less_columns.csv',
      size: 131585,
      n_attributes: 14,
    },
    {
      id: 3,
      title: 'VAST Challenge 2017',
      description: 'The VAST Challenge 2017 offered three mini-challenges and a grand challenge dealing with environmental problems potentially caused by human patterns of life and potentially harmful chemically laden effluent plumes being emitted from factory smokestacks. The data provided included traffic patterns, sensor data though the Boonsong Lekagul Nature Preserve.',
      name: 'Lekagul Sensor Data.csv',
      size: 171477,
      n_attributes: 4,
    },
    {
      id: 4,
      title: 'IEEE VIS Papers',
      description: 'IEEE VIS Publications 1990-2018',
      name: 'IEEE_VIS_papers_1990_2018',
      size: 3101,
      n_attributes: 18
    }
  ],
};
const shipyard = (state = initialState, action) => {
  switch (action.type) {
    case SET_DATA:
      const { data, attributes, source } = action;
      return Object.assign({}, state, {
        source,
        data,
        attributes,
        exportData: data,
      });
    case RESET_DATA:
      return initialState;
    case CHANGE_CHECK_STATUS:
      return Object.assign({}, state, {
        attributes: state.attributes.map(attr => {
          if (attr.name === action.attribute.name) {
            attr.checked = action.status;
          }
          return attr;
        }),
      });
    case CHANGE_TYPE_STATUS:
      debugger;
      return Object.assign({}, state, {
        attributes: state.attributes.map(attr => {
          if (attr.name === action.attribute.name) {
            attr.type = action.status;
          }
          return attr;
        }),
        data: state.source.map(datum => {
          switch(action.status) {
            case 'DATE':
              datum[action.attribute.name] = new Date(datum[action.attribute.name]);
              break;
            case 'SEQUENTIAL':
              datum[action.attribute.name] = +datum[action.attribute.name];
              break;
            case 'BOOLEAN':
              let stringValue = datum[action.attribute.name];
              if (stringValue.toLowerCase() === 'true') {
                datum[action.attribute.name] = true
              } else {
                datum[action.attribute.name] = false;
              }
              break;
            default:
              datum[action.attribute.name] = datum[action.attribute.name].toString();
          }
          return datum;
        })
      });
    case UPDATE_ATTRIBUTE:
      return Object.assign({}, state, {
        updated: !state.updated,
      });
    case UPDATE_FILTERED_DATA:
      return Object.assign({}, state, {
        exportData: action.exportData,
      });
    case TOGGLE_SETTINGS_VISIBLE:
      let items = state.attributes.slice(0);
      items[action.index]["settings"] = action.visible;
      return Object.assign({}, state, {
        attributes: items,
      });
    case SET_ATTRIBUTES:
      return Object.assign({}, state, {
        attributes: action.attributes,
      });
    case SET_ATTRIBUTE_COLOR:
      return Object.assign({}, state, {
        attributes: state.attributes.map(attr => {
          if (attr.name === action.attributeName) {
            attr["color"] = action.color;
          }
          return attr;
        }),
      });
    case SET_ALIAS:
      return state;
    case TOGGLE_COLOR_VISIBLE:
      return state;
    default:
      return state;
  }
};

export default shipyard;
