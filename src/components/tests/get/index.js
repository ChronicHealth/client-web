// @flow

import khange, { kheck } from 'khange';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getParam } from '@client/selectors/router';
import * as testSelectors from '@client/selectors/tests';
import { flowRight } from 'lodash';
import { getBatch } from '../../../@client/actions/bodyLevels';
import { formParent } from '../../../@client/hocs';
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
      get,
      getBodyLevels: getBatch
    },
    dispatch
  );

export const onKhange = (props: Object) => {
  props.get(props.id).then(test => {
    if (props.reinitializeForm) props.reinitializeForm.go();
    return props.getBodyLevels(test.bodyLevels);
  });
};

export default flowRight([
  formParent,
  connect(mapStateToProps, mapDispatchToProps),
  khange(kheck('id'), onKhange)
]);
