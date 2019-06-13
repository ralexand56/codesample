import React, { Component } from 'react';
import DataCols from './datacols';
import HeaderCols from './headercols';

import './style.css';

class MatrixReportContainer extends Component {
  public render() {
    return (
      <div className="row" style={{ padding: 0 }}>
        <div className="col col-lg-12 col-md-12">
          <table style={{ border: 'solid 1px #000' }}>
            <tr>
              <td style={{ width: 200, verticalAlign: 'top' }}>
                <HeaderCols />
              </td>
              {/* {this.CreateDataCols()} */}
              <td style={{ width: 250, verticalAlign: 'top' }}>
                <DataCols />
              </td>
              <td style={{ width: 250, verticalAlign: 'top' }}>
                <DataCols />
              </td>
              <td style={{ width: 250, verticalAlign: 'top' }}>
                <DataCols />
              </td>
              <td style={{ width: 250, verticalAlign: 'top' }}>
                <DataCols />
              </td>
            </tr>
          </table>
        </div>
      </div>
    );
  }

  public CreateDataCols = () => {
    const tableRow = [];
    
    for (const i = 0; i < 4; i + 1) {
      tableRow.push(
        <td key={i} style={{ width: 250, verticalAlign: 'top' }}>
          <DataCols key={i} />
        </td>
      );
    }
    return tableRow;
  };
}
export default MatrixReportContainer;
