import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { fetchData } from './actions/data';
// import { data } from './reducers';
// import ProductGroup from './productgroup';
import { connect } from 'react-redux';
// import IBucketRow from '../models/productbucket';
import Data from './models/data';
import ProductBucket from './productbucket';
import ProductPromo from './productpromo';

const sortData = [
  {
    bucketlist: [
      {
        productname: '3 Month CD - $2,500',
        bucket: [
          {
            id: 1,
            InstName: 'Citibank - CA',
            Rate: 0.05,
            APY: 0.05,
            Chg: '',
            Ref: true,
          },
          {
            id: 2,
            InstName: 'First Citizens Bank - CA',
            Rate: 0.05,
            APY: 0.05,
            Chg: '',
            Ref: false,
          },
          {
            id: 3,
            InstName: 'Citizens Business Bank - CA',
            Rate: 0.05,
            APY: 0.05,
            Chg: '',
            Ref: false,
          },
          {
            id: 4,
            InstName: 'Wells Fargo Bank - Northern and Central CA - CA',
            Rate: 0.05,
            APY: 0.05,
            Chg: '',
            Ref: false,
          },
          {
            id: 5,
            InstName: 'Wells Fargo Bank - San Francisco/Bay Region - CA',
            Rate: 0.05,
            APY: 0.05,
            Chg: '',
            Ref: false,
          },
          {
            id: 6,
            InstName: 'Chase - Northern - CA',
            Rate: 0.01,
            APY: 0.01,
            Chg: '',
            Ref: false,
          },
          {
            id: 7,
            InstName: 'Chase - Southern - CA',
            Rate: 0.01,
            APY: 0.01,
            Chg: '',
            Ref: false,
          },
          {
            id: 8,
            InstName: 'Wells Fargo Bank - Southern CA Region - CA',
            Rate: 'N/A',
            APY: 'N/A',
            Chg: '',
            Ref: false,
          },
        ],
        bucketavg: {
          InstName: 'Competitor Average',
          Rate: 0.04,
          APY: 0.04,
          Chg: '',
          Ref: false,
        },
      },
      {
        productname: '6 Month CD - $2,500',
        bucket: [
          {
            id: 9,
            InstName: 'Citizens Business Bank - CA',
            Rate: 0.2,
            APY: 0.2,
            Chg: '',
            Ref: false,
          },
          {
            id: 10,
            InstName: 'Citibank - CA',
            Rate: 0.07,
            APY: 0.07,
            Chg: '',
            Ref: true,
          },
          {
            id: 11,
            InstName: 'Chase - Northern - CA',
            Rate: 0.05,
            APY: 0.05,
            Chg: '',
            Ref: false,
          },
          {
            id: 12,
            InstName: 'Chase - Southern - CA',
            Rate: 0.05,
            APY: 0.05,
            Chg: '',
            Ref: false,
          },
          {
            id: 13,
            InstName: 'First Citizens Bank - CA',
            Rate: 0.05,
            APY: 0.05,
            Chg: '',
            Ref: false,
          },
          {
            id: 14,
            InstName: 'Wells Fargo Bank - Northern and Central CA - CA',
            Rate: 0.05,
            APY: 0.05,
            Chg: '',
            Ref: false,
          },
          {
            id: 15,
            InstName: 'Wells Fargo Bank - San Francisco/Bay Region - CA',
            Rate: 0.01,
            APY: 0.01,
            Chg: '',
            Ref: false,
          },
          {
            id: 16,
            InstName: 'Wells Fargo Bank - Southern CA Region - CA',
            Rate: 0.01,
            APY: 0.01,
            Chg: '',
            Ref: false,
          },
        ],
        bucketavg: {
          InstName: 'Competitor Average',
          Rate: 0.06,
          APY: 0.06,
          Chg: '',
          Ref: false,
        },
      },
      {
        productname: '12 Month CD - $2,500',
        bucket: [
          {
            id: 17,
            InstName: 'Citibank - CA',
            Rate: 0.2,
            APY: 0.2,
            Chg: '',
            Ref: true,
          },
          {
            id: 18,
            InstName: 'Citizens Business Bank - CA',
            Rate: 0.2,
            APY: 0.2,
            Chg: '',
            Ref: false,
          },
          {
            id: 19,
            InstName: 'First Citizens Bank - CA',
            Rate: 0.1,
            APY: 0.1,
            Chg: '',
            Ref: false,
          },
          {
            id: 20,
            InstName: 'Wells Fargo Bank - Northern and Central CA - CA',
            Rate: 0.1,
            APY: 0.1,
            Chg: '',
            Ref: false,
          },
          {
            id: 21,
            InstName: 'Wells Fargo Bank - San Francisco/Bay Region - CA',
            Rate: 0.1,
            APY: 0.1,
            Chg: '',
            Ref: false,
          },
          {
            id: 22,
            InstName: 'Wells Fargo Bank - Southern CA Region - CA',
            Rate: 0.1,
            APY: 0.1,
            Chg: '',
            Ref: false,
          },
          {
            id: 23,
            InstName: 'Chase - Northern - CA',
            Rate: 0.01,
            APY: 0.01,
            Chg: '',
            Ref: false,
          },
          {
            id: 24,
            InstName: 'Chase - Southern - CA',
            Rate: 0.01,
            APY: 0.01,
            Chg: '',
            Ref: false,
          },
        ],
        bucketavg: {
          InstName: 'Competitor Average',
          Rate: 0.1,
          APY: 0.1,
          Chg: '',
          Ref: false,
        },
      },
      {
        productname: '18 Month CD - $2,500',
        bucket: [
          {
            id: 25,
            InstName: 'Chase - Northern - CA',
            Rate: 0.35,
            APY: 0.35,
            Chg: '',
            Ref: false,
          },
          {
            id: 26,
            InstName: 'Chase - Southern - CA',
            Rate: 0.25,
            APY: 0.25,
            Chg: '',
            Ref: false,
          },
          {
            id: 27,
            InstName: 'Citibank - CA',
            Rate: 0.15,
            APY: 0.15,
            Chg: '',
            Ref: true,
          },
          {
            id: 28,
            InstName: 'Citizens Business Bank - CA',
            Rate: 0.1,
            APY: 0.1,
            Chg: '',
            Ref: false,
          },
          {
            id: 29,
            InstName: 'First Citizens Bank - CA',
            Rate: 0.1,
            APY: 0.1,
            Chg: '',
            Ref: false,
          },
          {
            id: 30,
            InstName: 'Wells Fargo Bank - Northern and Central CA - CA',
            Rate: 0.1,
            APY: 0.1,
            Chg: '',
            Ref: false,
          },
          {
            id: 31,
            InstName: 'Wells Fargo Bank - San Francisco/Bay Region - CA',
            Rate: 0.05,
            APY: 0.05,
            Chg: '',
            Ref: false,
          },
          {
            id: 32,
            InstName: 'Wells Fargo Bank - Southern CA Region - CA',
            Rate: 0.05,
            APY: 0.05,
            Chg: '',
            Ref: false,
          },
        ],
        bucketavg: {
          InstName: 'Competitor Average',
          Rate: 0.14,
          APY: 0.14,
          Chg: '',
        },
      },
    ],
    promolist: [
      {
        left: [
          {
            InstName: 'First Citizens Bank - CA',
            Ad: '',
            MinTerm: 6,
            MinAmount: '$2500',
            Rate: 0.1,
            APY: 0.1,
          },
          {},
          {},
          {},
          {},
        ],
      },
      {
        right: [{}, {}, {}, {}, {}],
      },
    ],
  },
  {
    bucketlist: [
      {
        productname: '24 Month CD - $2,500',
        bucket: [
          {
            id: 33,
            InstName: 'Citibank - CA',
            Rate: 0.05,
            APY: 0.05,
            Chg: '',
            Ref: true,
          },
          {
            id: 34,
            InstName: 'First Citizens Bank - CA',
            Rate: 0.05,
            APY: 0.05,
            Chg: '',
            Ref: false,
          },
          {
            id: 35,
            InstName: 'Citizens Business Bank - CA',
            Rate: 0.05,
            APY: 0.05,
            Chg: '',
            Ref: false,
          },
          {
            id: 36,
            InstName: 'Wells Fargo Bank - Northern and Central CA - CA',
            Rate: 0.05,
            APY: 0.05,
            Chg: '',
            Ref: false,
          },
          {
            id: 37,
            InstName: 'Wells Fargo Bank - San Francisco/Bay Region - CA',
            Rate: 0.05,
            APY: 0.05,
            Chg: '',
            Ref: false,
          },
          {
            id: 38,
            InstName: 'Chase - Northern - CA',
            Rate: 0.01,
            APY: 0.01,
            Chg: '',
            Ref: false,
          },
          {
            id: 39,
            InstName: 'Chase - Southern - CA',
            Rate: 0.01,
            APY: 0.01,
            Chg: '',
            Ref: false,
          },
          {
            id: 40,
            InstName: 'Wells Fargo Bank - Southern CA Region - CA',
            Rate: 'N/A',
            APY: 'N/A',
            Chg: '',
            Ref: false,
          },
        ],
        bucketavg: {
          InstName: 'Competitor Average',
          Rate: 0.29,
          APY: 0.29,
          Chg: '',
          Ref: false,
        },
      },
      {
        productname: '36 Month CD - $2,500',
        bucket: [
          {
            id: 41,
            InstName: 'Citizens Business Bank - CA',
            Rate: 0.2,
            APY: 0.2,
            Chg: '',
            Ref: false,
          },
          {
            id: 42,
            InstName: 'Citibank - CA',
            Rate: 0.07,
            APY: 0.07,
            Chg: '',
            Ref: true,
          },
          {
            id: 43,
            InstName: 'Chase - Northern - CA',
            Rate: 0.05,
            APY: 0.05,
            Chg: '',
            Ref: false,
          },
          {
            id: 44,
            InstName: 'Chase - Southern - CA',
            Rate: 0.05,
            APY: 0.05,
            Chg: '',
            Ref: false,
          },
          {
            id: 45,
            InstName: 'First Citizens Bank - CA',
            Rate: 0.05,
            APY: 0.05,
            Chg: '',
            Ref: false,
          },
          {
            id: 46,
            InstName: 'Wells Fargo Bank - Northern and Central CA - CA',
            Rate: 0.05,
            APY: 0.05,
            Chg: '',
            Ref: false,
          },
          {
            id: 47,
            InstName: 'Wells Fargo Bank - San Francisco/Bay Region - CA',
            Rate: 0.01,
            APY: 0.01,
            Chg: '',
            Ref: false,
          },
          {
            id: 48,
            InstName: 'Wells Fargo Bank - Southern CA Region - CA',
            Rate: 0.01,
            APY: 0.01,
            Chg: '',
            Ref: false,
          },
        ],
        bucketavg: {
          InstName: 'Competitor Average',
          Rate: 0.41,
          APY: 0.41,
          Chg: '',
          Ref: false,
        },
      },
      {
        productname: '48 Month CD - $2,500',
        bucket: [
          {
            id: 49,
            InstName: 'Citibank - CA',
            Rate: 0.2,
            APY: 0.2,
            Chg: '',
            Ref: true,
          },
          {
            id: 50,
            InstName: 'Citizens Business Bank - CA',
            Rate: 0.2,
            APY: 0.2,
            Chg: '',
            Ref: false,
          },
          {
            id: 51,
            InstName: 'First Citizens Bank - CA',
            Rate: 0.1,
            APY: 0.1,
            Chg: '',
            Ref: false,
          },
          {
            id: 52,
            InstName: 'Wells Fargo Bank - Northern and Central CA - CA',
            Rate: 0.1,
            APY: 0.1,
            Chg: '',
            Ref: false,
          },
          {
            id: 53,
            InstName: 'Wells Fargo Bank - San Francisco/Bay Region - CA',
            Rate: 0.1,
            APY: 0.1,
            Chg: '',
            Ref: false,
          },
          {
            id: 54,
            InstName: 'Wells Fargo Bank - Southern CA Region - CA',
            Rate: 0.1,
            APY: 0.1,
            Chg: '',
            Ref: false,
          },
          {
            id: 55,
            InstName: 'Chase - Northern - CA',
            Rate: 0.01,
            APY: 0.01,
            Chg: '',
            Ref: false,
          },
          {
            id: 56,
            InstName: 'Chase - Southern - CA',
            Rate: 0.01,
            APY: 0.01,
            Chg: '',
            Ref: false,
          },
        ],
        bucketavg: {
          InstName: 'Competitor Average',
          Rate: 0.53,
          APY: 0.53,
          Chg: '',
          Ref: false,
        },
      },
      {
        productname: '60 Month CD - $2,500',
        bucket: [
          {
            id: 57,
            InstName: 'Chase - Northern - CA',
            Rate: 0.35,
            APY: 0.35,
            Chg: '',
            Ref: false,
          },
          {
            id: 58,
            InstName: 'Chase - Southern - CA',
            Rate: 0.25,
            APY: 0.25,
            Chg: '',
            Ref: false,
          },
          {
            id: 59,
            InstName: 'Citibank - CA',
            Rate: 0.15,
            APY: 0.15,
            Chg: '',
            Ref: true,
          },
          {
            id: 60,
            InstName: 'Citizens Business Bank - CA',
            Rate: 0.1,
            APY: 0.1,
            Chg: '',
            Ref: false,
          },
          {
            id: 61,
            InstName: 'First Citizens Bank - CA',
            Rate: 0.1,
            APY: 0.1,
            Chg: '',
            Ref: false,
          },
          {
            id: 62,
            InstName: 'Wells Fargo Bank - Northern and Central CA - CA',
            Rate: 0.1,
            APY: 0.1,
            Chg: '',
            Ref: false,
          },
          {
            id: 63,
            InstName: 'Wells Fargo Bank - San Francisco/Bay Region - CA',
            Rate: 0.05,
            APY: 0.05,
            Chg: '',
            Ref: false,
          },
          {
            id: 64,
            InstName: 'Wells Fargo Bank - Southern CA Region - CA',
            Rate: 0.05,
            APY: 0.05,
            Chg: '',
            Ref: false,
          },
        ],
        bucketavg: {
          InstName: 'Competitor Average',
          Rate: 0.61,
          APY: 0.61,
          Chg: '',
        },
      },
    ],
    promolist: [
      {
        left: [
          {
            InstName: 'Wells Fargo Bank - Northern and Central CA - CA',
            Ad: '',
            MinTerm: 24,
            MinAmount: '$2500',
            Rate: 0.0,
            APY: 1.28,
          },
          {
            InstName: 'Wells Fargo Bank - San Francisco/Bay Region - CA',
            Ad: '',
            MinTerm: 24,
            MinAmount: '$2500',
            Rate: 0.0,
            APY: 1.28,
          },
          {
            InstName: 'Wells Fargo Bank - Southern CA Region - CA',
            Ad: '',
            MinTerm: 24,
            MinAmount: '$2500',
            Rate: 0.0,
            APY: 1.28,
          },
          {},
          {},
        ],
      },
      {
        right: [{}, {}, {}, {}, {}],
      },
    ],
  },
];

interface Props {
  data: Data[];
}
interface State {
  data: Data[];
}

class ProductGroupList extends Component<Props, State> {
  public createGroupList = () =>
    // console.dir(sortData) || (
    //   <label style={{ lineHeight: '30px', paddingLeft: '14px' }}>
    //     Promotional Prodcuts
    //   </label>
    // );
    sortData.map((data, i) => (
      <div key={i} className="row">
        {/* style={{borderBottom: "1px solid teal"}} */}
        {typeof data.bucketlist === 'object' ? (
          <>
            {data.bucketlist.map((bdata, j) => (
              <ProductBucket key={j} productName={bdata.productname}>
                {this.createListItems(bdata.bucket)}
                {this.createCompAvg(bdata.bucketavg)}
              </ProductBucket>
            ))}
          </>
        ) : null}
        <label style={{ lineHeight: '30px', paddingLeft: '14px' }}>
          Promotional Prodcuts
        </label>

        <div className="container" style={{ width: '100%' }}>
          <div className="row">
            {data.promolist.map((pdata, p) => (
              <ProductPromo key={p} promoData={pdata.left}>
                {this.createPromoListItems(pdata.left)}
                {this.createPromoListItems(pdata.right)}
              </ProductPromo>
            ))}
          </div>
        </div>
        <hr style={{ borderColor: 'teal', height: 20 }} />
      </div>
    ));

  // tslint:disable-next-line:no-any
  public createListItems = (bucket: any) =>
    // tslint:disable-next-line:no-any
    bucket.map((rowdata: any, k: number) => (
      // <tr key={k} className={this.classRef(rowdata.Ref)}>
      <tr key={k} className={rowdata.Ref ? 'ref' : ''}>
        <td>{rowdata.InstName}</td>
        <td>
          {parseFloat(rowdata.Rate).toFixed(2) === 'NaN'
            ? 'N/A'
            : parseFloat(rowdata.Rate).toFixed(2)}{' '}
        </td>
        <td>
          {parseFloat(rowdata.APY).toFixed(2) === 'NaN'
            ? 'N/A'
            : parseFloat(rowdata.APY).toFixed(2)}{' '}
        </td>
        <td>{rowdata.Chg}</td>
      </tr>
    ));

  // tslint:disable-next-line:no-any
  public createCompAvg = (bucketavg: any) => (
    <tr className="competitor">
      <td>{bucketavg.InstName}</td>
      <td>{parseFloat(bucketavg.Rate).toFixed(2)}</td>
      <td>{parseFloat(bucketavg.APY).toFixed(2)} </td>
      <td>{bucketavg.Chg}</td>
    </tr>
  );

  // tslint:disable-next-line:no-any
  public createPromoListItems = (promo: any) =>
    promo &&
    // tslint:disable-next-line:no-any
    promo.map((prowdata: any, p: number) => (
      <tr key={p}>
        <td>
          {prowdata.InstName}
          &nbsp;
        </td>
        <td>{prowdata.MinTerm}</td>
        <td>{prowdata.MinAmount}</td>
        <td>{prowdata.Rate}</td>
        <td>{prowdata.APY}</td>
      </tr>
    ));

  public render() {
    return (
      <div className="container" style={{ width: '100%' }}>
        {this.createGroupList()}
      </div>
    );
  }
}

const mapStateToProps = (state: State) => {
  return {
    // buckets: state.buckets
    data: state.data,
  };
};

// const mapDispatchToProps = { fetchData };
// export default connect(mapStateToProps, mapDispatchToProps)(ProductGroupList);
export default connect(mapStateToProps)(ProductGroupList);
