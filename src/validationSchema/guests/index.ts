import * as yup from 'yup';

export const guestValidationSchema = yup.object().shape({
  visited_date: yup.date().required(),
  status: yup.string().required(),
  organization_viewed: yup.string().nullable(),
  feedback_given: yup.string().nullable(),
  user_id: yup.string().nullable(),
});
