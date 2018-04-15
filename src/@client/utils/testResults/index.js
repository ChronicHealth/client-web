// @flow
import Yup from 'yup';
import moment from 'moment';
export const validationSchema = Yup.object().shape({
  amount: Yup.string().required()
});

export const getId = ({
  date,
  bodyLevelId,
  clientId
}: {
  date: moment,
  bodyLevelId: $$id,
  clientId: $$id
}) => {
  return `${moment(date).format('YYYY-MM-DD')}-${clientId}-${bodyLevelId}`;
};
