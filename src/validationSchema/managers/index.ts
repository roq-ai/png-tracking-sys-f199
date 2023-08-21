import * as yup from 'yup';

export const managerValidationSchema = yup.object().shape({
  joined_date: yup.date().required(),
  status: yup.string().required(),
  team_managed: yup.string().nullable(),
  task_overseen: yup.string().nullable(),
  user_id: yup.string().nullable(),
});
