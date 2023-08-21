import * as yup from 'yup';

export const teamMemberValidationSchema = yup.object().shape({
  joined_date: yup.date().required(),
  status: yup.string().required(),
  task_assigned: yup.string().nullable(),
  task_completed: yup.string().nullable(),
  user_id: yup.string().nullable(),
});
