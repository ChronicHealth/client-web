// @flow
import * as React from 'react';
import { UL, ULItem } from '../../../ui-kit';
import { List } from 'immutable';

type $props = {
  references: List<string>
};
export default class References extends React.PureComponent<$props> {
  render() {
    return (
      <div>
        <h3>References</h3>
        {this.props.references.size ? (
          <UL>
            {this.props.references.map((value, i) => {
              return <ULItem key={i} caption={value} />;
            })}
          </UL>
        ) : (
          <p>No references have been listed</p>
        )}
      </div>
    );
  }
}
