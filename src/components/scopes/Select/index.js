// @flow
import * as React from 'react';
import { flowRight } from '@client/utils/components';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { SelectDropdown } from 'ui-kit';
import classnames from 'classnames';
import ScopeChip from '../Chip';
import { removeItemFromArray } from '../../../@client/utils/components';
import { scopesJS } from '@client/selectors/scopes';
import styles from './style.pcss';

type $stateProps = {
  scopes: Array<Object>
};
type $ownProps = { onChange: Function, className?: string, default: boolean };
type $dispatchProps = {};
type $props = $stateProps & $dispatchProps & $ownProps;
export class SelectScope extends React.PureComponent<$props> {
  renderSelectedScopes = (values: Array<$$id>) => {
    return (
      <div>
        {values.map(id => (
          <ScopeChip
            onDeleteClick={() =>
              this.props.onChange(removeItemFromArray(id, values))
            }
            id={id}
            key={id}
          />
        ))}
      </div>
    );
  };
  render() {
    const { className, scopes, ...props } = this.props;
    return (
      <SelectDropdown
        className={classnames(styles.selectScope, className)}
        sync
        renderValues={this.renderSelectedScopes}
        options={scopes}
        {...props}
      />
    );
  }
}

const mapStateToProps: $$selectorExact<$stateProps> = createStructuredSelector({
  scopes: scopesJS
});

export default flowRight([connect(mapStateToProps)])(SelectScope);
