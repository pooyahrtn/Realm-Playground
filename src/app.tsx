import React from 'react';
import AddUserPage from './pages/add-user.view';
import RealmProvider from './database/RealmProvider';
/**
 * This function is the entry point of the application.
 */
export default () => {
  return (
    <RealmProvider>
      <AddUserPage />
    </RealmProvider>
  );
};
