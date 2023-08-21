import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ManagerInterface {
  id?: string;
  user_id?: string;
  joined_date: any;
  status: string;
  team_managed?: string;
  task_overseen?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface ManagerGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  status?: string;
  team_managed?: string;
  task_overseen?: string;
}
