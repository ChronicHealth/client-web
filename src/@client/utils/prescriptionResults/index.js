// @flow
import Yup from 'yup';
import Moment, { isMoment } from 'moment';

export const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  general: Yup.string()
});

export const formatDate = (date: string | Moment) => {
  if (date) {
    if (isMoment(date)) {
      // $FlowFixMe
      return date.format('YYYY-MM-DD');
    }
    return new Moment(date).format('YYYY-MM-DD');
  }
};
// $FlowFixMe
export const formatDateRange = ({ startDate, endDate }: Object) =>
  `${formatDate(startDate)}-${formatDate(endDate)}`;
