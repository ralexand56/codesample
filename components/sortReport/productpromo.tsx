import React, { Component } from 'react';

interface Props {
  // tslint:disable-next-line:no-any
  promoData: any;
}

class ProductPromo extends Component<Props, {}> {
  // tslint:disable-next-line:no-any
  public createPromo = (promoData: any) => (
    <div className="col col-lg-6 col-md-6">
      <table className="table table-stripped table-hover table-bordered">
        <thead>
          <tr id="cols">
            <td>Institution Name</td>
            <td>MinTerm</td>
            <td>Min Amount</td>
            <td>Rate</td>
            <td>APY</td>
          </tr>
        </thead>
        <tbody>{this.props.children}</tbody>
      </table>
    </div>
  );

  public render() {
    return <>{this.createPromo(this.props.promoData)}</>;
  }
}

export default ProductPromo;
