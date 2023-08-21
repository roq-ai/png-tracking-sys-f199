import * as yup from 'yup';

export const analystValidationSchema = yup.object().shape({
  joined_date: yup.date().required(),
  status: yup.string().required(),
  analysis_performed: yup.string().nullable(),
  report_generated: yup.string().nullable(),
  user_id: yup.string().nullable(),
});
