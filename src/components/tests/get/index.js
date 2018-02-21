// @flow

import khange, { kheck } from 'khange';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getParam } from '@client/selectors/router';
import * as testSelectors from '@client/selectors/tests';

import { get } from '@client/actions/tests';
import { bindActionCreators } from '@client/utils/components';

const getTestId = getParam('testId');

export const mapStateToProps = createStructuredSelector({
  id: getTestId,
  test: testSelectors.find(getTestId)
});

export const mapDispatchToProps = (dispatch: $$dispatch) =>
  bindActionCreators(
    {
      get
    },
    dispatch
  );

export const onKhange = (props: Object) => {
  props.get(props.id).then(() => {
    if (props.reinitializeForm) props.reinitializeForm();
  });
};

export default {
  connect: connect(mapStateToProps, mapDispatchToProps),
  khange: khange(kheck('id'), onKhange)
};
