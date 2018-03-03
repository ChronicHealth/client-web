// @flow
import { getBaseSelectorsPage } from '@client/utils/selectors';
import Model from '@client/models/pages/MyClient';

const base = getBaseSelectorsPage('myClients', new Model());

module.exports = {
  ...base
};
