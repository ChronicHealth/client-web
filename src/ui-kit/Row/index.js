// @flow
import * as React from 'react';
import { Grid, Row as RFGRow } from 'react-flexbox-grid';

type $props = Object;

export default class Row extends React.PureComponent<$props> {
  render() {
    return (
      <Grid fluid>
        <RFGRow>{this.props.children}</RFGRow>
      </Grid>
    );
  }
}
