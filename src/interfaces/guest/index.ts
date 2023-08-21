import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface GuestInterface {
  id?: string;
  user_id?: string;
  visited_date: any;
  status: string;
  organization_viewed?: string;
  feedback_given?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface GuestGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  status?: string;
  organization_viewed?: string;
  feedback_given?: string;
}
