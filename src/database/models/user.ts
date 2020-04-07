import {ObjectSchema} from 'realm';
export interface User {
  name: string;
  email: string;
}

export const userSchema: ObjectSchema = {
  name: 'User',
  properties: {
    name: 'string',
    email: 'string',
  },
};
