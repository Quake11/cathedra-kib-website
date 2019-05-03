import { Roles } from './roles.interface';
// TODO: move private fields to subcollection
export interface User {
  uid: string;
  joined?: number; // Date when user registered, timestamp
  email: string;
  provider: string;
  phoneNumber?: string;
  photoURL?: string;
  displayName?: string;
  firstname?: string;
  lastname?: string;
  middlename?: string;
  description?: string;
  roles?: Map<string, boolean>;
  fcmTokens?: Array<string>;
  confirmed?: any;
  group?: string;
  groupName?: string;
}
