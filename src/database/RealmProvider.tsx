import React, {
  createContext,
  PropsWithChildren,
  useState,
  useEffect,
  useContext,
} from 'react';
import Realm from 'realm';
import {schemas} from './models';

const RealmContext = createContext<Realm | undefined>(undefined);

export default (props: PropsWithChildren<{}>) => {
  const {children} = props;

  const [realm, setRealm] = useState<Realm>();

  useEffect(() => {
    if (!realm || realm.isClosed) {
      Realm.open({schema: schemas}).then((r) => {
        console.log('realm initiated');
        setRealm(r);
      });
    }
    return () => {
      if (!!realm && !realm.isClosed) {
        console.log('close realm');
        realm.close();
      }
    };
  }, [realm]);

  return (
    <RealmContext.Provider value={realm}>{children}</RealmContext.Provider>
  );
};

export const useRealm = () => useContext(RealmContext);
