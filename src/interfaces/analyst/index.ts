import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface AnalystInterface {
  id?: string;
  user_id?: string;
  joined_date: any;
  status: string;
  analysis_performed?: string;
  report_generated?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface AnalystGetQueryInterface extends GetQueryInterface {
  id?: string;
  user_id?: string;
  status?: string;
  analysis_performed?: string;
  report_generated?: string;
}
