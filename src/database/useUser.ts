import {useCallback, useState} from 'react';
import {User, userSchema} from './models/user';
import {useRealm} from './RealmProvider';
import {writeJson, readJson} from '../files';

export type RealmUsers = Realm.Results<User & Realm.Object>;
export const useUser = () => {
  const realm = useRealm();
  const [users, setUsers] = useState<RealmUsers>();
  const writeUser = useCallback(
    (user: User) => {
      if (realm) {
        realm.write(() => {
          realm.create(userSchema.name, user);
        });
      }
    },
    [realm],
  );
  const refreshUsers = useCallback(() => {
    if (realm) {
      const databaseUsers = realm.objects<User>(userSchema.name);
      setUsers(databaseUsers);
    }
  }, [realm]);

  const exportUsers = useCallback(() => {
    if (realm) {
      const databaseUsers = realm.objects<User>(userSchema.name);
      writeJson('users', databaseUsers);
    }
  }, [realm]);

  const loadFile = useCallback(async () => {
    const localData = await readJson('users');
    if (realm) {
      realm.write(() => {
        // delete current users
        const databaseUsers = realm.objects<User>(userSchema.name);
        realm.delete(databaseUsers);

        // load the file
        Object.keys(localData).forEach((r: any) =>
          realm.create(userSchema.name, localData[r]),
        );
        refreshUsers();
      });
    }
  }, [realm, refreshUsers]);

  return {writeUser, users, refreshUsers, exportUsers, loadFile};
};
