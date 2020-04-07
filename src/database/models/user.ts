import {ObjectSchema} from 'realm';
export interface User {
  email: string;
  name: string;
}

export const userSchema: ObjectSchema = {
  name: 'User',
  properties: {
    name: 'string',
    email: 'string',
  },
};
