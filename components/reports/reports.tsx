import React, { SFC } from 'react';
import ReportView from '../../pages/reports';
// import { Link, Redirect, Route, Switch } from 'react-router-dom';
// import HeaderControl from '../../ui/HeaderControl';
// import Radio from '../../ui/Radio';
// import Institutions from '../pages/Institutions';
// import Preview from '../pages/Preview';
// import Products from '../pages/products';
// import { Actions } from '../../../store/modules/view/actions';
// import styled from 'styled-components';
// import Reports from './reports';

interface Props {
  selectedReportsTabId: string;
}

// const tabs: Record<string, ReactNode> = {
//   '0': <Favorites />,
//   '1': <Institutions />,
//   '2': <
// };

// const RadioItems = [
//   { id: '0', item: <Link to="/reports/favorites">Favorites</Link> },
//   { id: '1', item: <Link to="/reports/institutions">Institutions</Link> },
//   { id: '2', item: <Link to="/reports/products">Products</Link> },
//   { id: '3', item: <Link to="/reports/preview">Preview</Link> },
// ];

export const Reports: SFC<Props> = () => (
  <ReportView />
  // <HeaderControl header="Favorites" margin="0px">
  //   {/* <Radio
  //     value={selectedReportsTabId}
  //     onChange={id => setReportTab(id)}
  //     items={RadioItems}
  //   /> */}

  //   <Switch>
  //     <Route path="/reports/institutions" component={Institutions} />
  //     <Route path="/reports/products" component={Products} />
  //     <Route path="/reports/preview" component={Preview} />
  //     <Route path="/reports/favorites" component={Favorites} />
  //     <Redirect to="/reports/favorites" />
  //   </Switch>
  // </HeaderControl>
);

export default Reports;
