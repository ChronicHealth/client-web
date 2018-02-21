// @flow
import { baseServices } from '@client/utils/services';

const base = baseServices('comments');

module.exports = {
  ...base,
  byIssue: (issueId: $$id) => base.get(`by_issue/${issueId}`)
};
