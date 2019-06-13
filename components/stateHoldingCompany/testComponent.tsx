import React from 'react';
// import CheckControl from 'src/modules/common/ui/CheckControl';
// import { NameSelection } from 'src/types';

// interface Props {
//   value?: NameSelection;
//   // tslint:disable-next-line:no-any
//   api?: any;
//   // tslint:disable-next-line:no-any
//   getValue?: any;
// }

// tslint:disable-next-line:no-any
export default (value: any) => {
  // did you know that React passes props to your component constructor??
  // constructor(props: Props) {
  //   super(props);

  // from here you can access any of the props!
  // console.log('The value is ' + props.value);
  // we can even call grid API functions, if that was useful
  // props.api.selectAll();
  // }

  // tslint:disable-next-line:no-any
  // tslint:disable-next-line:typedef
  // public refresh(params: { value: { toFixed: (arg0: number) => void } }) {
  //   console.dir(params);

  //   return false;
  // }

  // public getGui() {
  //   return 'Hello';
  // }

  // public componentDidUpdate() {
  // console.dir(this.props.data.isSelected);
  // }
  console.dir(value);

  return <div>Home</div>;
};
