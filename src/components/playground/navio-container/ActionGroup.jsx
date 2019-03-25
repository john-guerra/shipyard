import React from 'react';
import { connect } from 'react-redux';
import { Button, Icon, Tooltip } from 'antd';
import { resetData, toggleSidebar } from './../../../actions';
import FileSaver from 'file-saver';

const ButtonGroup = Button.Group;
const ActionGroup = ({ exportData, data, attributes, resetData, toggleSidebar }) => {
  const download = (rand) => {
    let dataToExport = JSON.parse(JSON.stringify(exportData));
    dataToExport.forEach(d => delete d.__i);
    const replacer = (key, value) => value === null ? '' : value; // specify how you want to handle null values here
    const header = Object.keys(dataToExport[0]);
    let csv = dataToExport.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
    csv.unshift(header.join(','));
    csv = csv.join('\r\n');
    const blob = new Blob([csv], {type: 'text/csv;charset=utf-8'});
    FileSaver.saveAs(blob, `export_data_${rand}.csv`);
    exportData = data;
  };
  const exportVisualization = () => {
    const rand = Math.floor(Math.random() * 999999);
    let mimeType = 'text/html';
    let catColumns = [];
  let seqColumns = [];
    attributes.forEach(a => {
      if (a.type === 'categorical') {
        catColumns.push(a.name);
      } else {
        seqColumns.push(a.name);
      }
    })
    const elHtml = `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Navio</title>
    </head>
    <body>
      <div id="navio"></div>

      <script src="https://d3js.org/d3.v4.min.js"></script>
      <script src="https://d3js.org/d3-scale-chromatic.v1.min.js"></script>
      <script src="https://unpkg.com/popper.js@1.14/dist/umd/popper.min.js"></script>
      <script type="text/javascript" src="https://unpkg.com/navio/dist/navio.min.js"></script>
      <script type="text/javascript">
        let nn = navio("#navio", 600);
        let cat = "CATEGORICAL"
        let seq = "SEQUENTIAL";
        let text = "TEXT";
        let bool = "BOOLEAN";
        let divergent = "DIVERGENT";
        let date = "DATE";
      let attributes = JSON.parse('${JSON.stringify(attributes)}');
        d3.csv("./export_data_${rand}.csv", function (err, data) {
          if (err) throw err;
        data.forEach((row) => {
          attributes.forEach(att => {
            if (att.type === date) {
              let mydate = new Date(row[att.name]);
              if(isNaN(mydate.getDate())){
                row[att.name] = null;
              } else {
                row[att.name] = mydate
              }
            }
            else if (att.type === seq) {
              let mynumber = +row[att.name];
              if (isNaN(mynumber)) {
                row[att.name] = null;
              } else {
                row[att.name] = mynumber;
              }
            } else if (att.type === bol) {
              let myBool = row[att.name];
              if (myBool.toLowerCase() === 'true') {
                row[att.name] = true;
              } else {
                row[att.name] = false;
              }
            }
          }
        })

        attributes.forEach((d,i) => {
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
                case divergent:
                  nn.addDivergingAttrib(d.name);
                  break;
                case date:
                  nn.addDateAttrib(d.name);
                  break;
                case seq:
                  nn.addSequentialAttrib(d.name);
                  break
                default:
                  nn.addCategoricalAttrib(d.name);
              }
           }
          })
        nn.data(data);
      });
      </script>
    </body>
    </html>`;
    download(rand);
    mimeType = mimeType || 'text/plain';
    const filename = 'index.html';
    const blob = new Blob([elHtml], {type: `${mimeType};charset=utf-8`});
    FileSaver.saveAs(blob, filename);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <ButtonGroup>
        <Tooltip
          placement="bottom"
          title="Show side panel to setup Navio: change type, color and visibility of the attributes."
        >
          <Button onClick={toggleSidebar}>
            <Icon type="setting" />Navio
          </Button>
        </Tooltip>
        <Tooltip
          placement="bottom"
          title="Export the filtered data in csv format."
        >
          <Button onClick={download}>
            <Icon type="table" />Export data
          </Button>
        </Tooltip>
        <Tooltip
          placement="bottom"
          title="Export an embedded version of the visualization (data.csv + index.html)."
        >
          <Button onClick={exportVisualization}>
              <Icon type="export" />Export Vis
          </Button>
        </Tooltip>
        <Tooltip placement="bottom" title="Choose another dataset.">
          <Button onClick={resetData}>
            <Icon type="swap" />Change data
          </Button>
        </Tooltip>
      </ButtonGroup>
    </div>
  );
};

const mapStateToProps = state => ({
  exportData: state.shipyard.exportData,
  data: state.shipyard.data,
  attributes: state.shipyard.attributes,
});

const mapDispatchToProps = dispatch => ({
  resetData: () => dispatch(resetData()),
  toggleSidebar: () => dispatch(toggleSidebar()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ActionGroup);
