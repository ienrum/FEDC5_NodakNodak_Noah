import { User } from '@/types/APIResponseTypes';

export interface UserSnippetGroupProps {
  title?: string;
  userArray: User[];
  myInfo?: User;
}
