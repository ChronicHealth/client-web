// @flow
import { createStructuredSelector } from 'reselect';
import { getParam } from '@client/selectors/router';
import { flowRight } from '@client/utils/components';
import { find, getRelated } from '@client/selectors/issues';
import { connect } from 'react-redux';
import khange, { kheck } from 'khange';
import { bindActionCreators } from '@client/utils/components';
import { get, getComments } from '@client/actions/issues';
import { formParent } from '@client/hocs';

const id = getParam('issueId');

const mapStateToProps = createStructuredSelector({
  id,
  issue: find(id),
  commentIds: getRelated('comments', id)
});

const mapDispatchToProps = (dispatch: $$dispatch) =>
  bindActionCreators(
    {
      get,
      getComments
    },
    dispatch
  );

const onKhange = props => {
  props.getComments(props.id);
  props.get(props.id).then(() => {
    if (props.reinitializeForm) props.reinitializeForm.go();
  });
};

export default flowRight([
  formParent,
  connect(mapStateToProps, mapDispatchToProps),
  khange(kheck('id'), onKhange)
]);
