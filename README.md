# Realm Playground

![](screenshot.png =250x250)
1. Create a new user: enter email and username then press "Add new user" button. It will create a new user in Realm database.
2. Press "Refresh" button to load users inside database and refresh the list view. 
3. To export users table, press "Export" button. It will create a file named "users.json", and save it to [the absolute path to the document directory](https://github.com/itinance/react-native-fs#api).
4. To load users from local file, press "Load file". It will delete current users database, load "users.json" into the database, and refresh the list view.

## Furthur works
### Export
Currently we store data inside local directory, which will be deleted with application. A solution might be using realm sync, to sync database with realm cloud, or upload stored file to some api.

### Add listeners
To update view, after database transactions, we can add [listeners](https://realm.io/docs/javascript/latest/#notifications) to realm query object.


## Code structure

#### src/app.tsx
The entry point of application placed here. Here we will load router, init providers like realm, and so on.

#### src/files.ts
We defined utility functions to store and read files here.

#### src/database
  * Models: we defined models schema and interfaces here
  * RealmProvider: We create a provider, to open and close realm connection, and share realm instance with context. We wrap our application with this.
  * useUsers: custom hook to intract with database.