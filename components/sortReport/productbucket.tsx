import React, { Component } from 'react';

interface Props {
  productName: string;
}

class ProductBucket extends Component<Props, {}> {
  public createBucket = (productName: string) => (
    <div className="col col-lg-3 col-md-3">
      <table className="table table-stripped table-hover table-bordered">
        <thead>
          <tr>
            <th colSpan={4}>{productName}</th>
          </tr>
          <tr id="cols">
            <td>Name</td>
            <td>Rate</td>
            <td>Apy</td>
            <td>Chg</td>
          </tr>
        </thead>
        <tbody>{this.props.children}</tbody>
      </table>
    </div>
  );

  public render() {
    return (
      <>
        {this.createBucket(this.props.productName)}
        {/* <div>Promotional Products</div> */}
        {/* {this.createPromo()} */}
      </>
    );
  }
}
export default ProductBucket;
