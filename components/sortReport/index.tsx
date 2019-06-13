import React, { Component } from 'react';
import ProductGroupList from './productgrouplist';

import './style.css';

const pstyle = {
  fontWeight: 400,
  paddingLeft: '8px',
  paddingRight: '14px',
};

const tstyle = {
  paddingLeft: '8px',
  paddingRight: '8px',
};

class SortReportContainer extends Component {
  public render() {
    return (
      <div className="row" style={{ overflow: 'auto' }}>
        <div className="col-lg-16">
          <div className="ibox">
            <div className="ibox-title">
              <label style={tstyle}>Deposit Rates - All Cali - Updated </label>{' '}
              <label style={pstyle}>
                Generated on 8/20/20 by sakhtar, comparison date: 8/13/2018
              </label>
              {/* <button type="button" className="btn btn-primary">
                <i className="fa fa-file-excel-o fa-lg" /> Export{' '}
              </button>{' '}
              <button type="button" className="btn btn-primary">
                {' '}
                <i className="fa fa-file-pdf-o fa-lg" /> Print{' '}
              </button> */}
            </div>
            <div className="ibox-content">
              <ProductGroupList />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default SortReportContainer;
