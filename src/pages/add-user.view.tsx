import React, {useState, useCallback} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  ViewStyle,
} from 'react-native';
import {useUser, User} from '../database';

export default () => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const {users, refreshUsers, writeUser, exportUsers, loadFile} = useUser();

  const addPressed = useCallback(() => {
    writeUser({name: username, email});
  }, [username, email, writeUser]);

  return (
    <SafeAreaView style={styles.display}>
      <View style={styles.header}>
        <Button title="Refresh" onPress={refreshUsers} />
        <Button title="Export" onPress={exportUsers} />
        <Button title="Load file" onPress={loadFile} />
      </View>

      <KeyboardAvoidingView style={styles.display} behavior="padding">
        <FlatList
          style={styles.content}
          data={users}
          keyExtractor={(u) => u.email}
          renderItem={({item}) => (
            <UserRow name={item.name} email={item.email} />
          )}
        />
        <View style={styles.newUserContainer}>
          <TextInput
            style={styles.input}
            value={username}
            placeholder="Enten new username"
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter new email"
            keyboardType="email-address"
            autoCompleteType="email"
          />
          <TouchableOpacity style={styles.addButton} onPress={addPressed}>
            <Text>Add new user</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const UserRow = (props: User) => {
  console.log(props);
  return (
    <View style={styles.userRowContainer}>
      <Text>Email: {props.email}</Text>
      <Text>Username: {props.name}</Text>
    </View>
  );
};

const Button = (props: {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
}) => {
  const {title, onPress} = props;
  return (
    <TouchableOpacity onPress={onPress} style={styles.haderButton}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

const space = 15;
const styles = StyleSheet.create({
  display: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  newUserContainer: {
    padding: space,
    borderTopWidth: 1,
    borderColor: 'gray',
    backgroundColor: 'white',
  },
  input: {
    borderRadius: space,
    marginVertical: space / 2,
    borderWidth: 1,
    borderColor: 'gray',
    padding: space,
  },
  inputHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addButton: {
    backgroundColor: 'rgb(10,200,200)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: space,
    marginVertical: space,
    borderRadius: space,
  },
  userRowContainer: {
    marginVertical: space / 2,
    marginHorizontal: space,
    borderRadius: space,
    backgroundColor: 'white',
    shadowOpacity: 0.1,
    padding: space,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  header: {
    flexDirection: 'row',
    margin: space,
    borderBottomWidth: 1,
    borderColor: 'gray',
    paddingBottom: space / 2,
  },
  haderButton: {
    flex: 1,
    margin: space / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'pink',
    padding: space,
    borderRadius: space,
  },
});
