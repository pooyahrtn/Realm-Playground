import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';

export default () => {
  const [username, setUsername] = useState<string>();
  const [email, setEmail] = useState<string>();

  return (
    <SafeAreaView style={styles.display}>
      {/* <FlatList style={styles.content} /> */}
      <View style={styles.newUserContainer}>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCompleteType="email"
        />
        <TouchableOpacity>
          <Text>Add new user</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
    elevation: 1,
    shadowOpacity: 0.2,
  },
  input: {
    borderRadius: space,
    marginVertical: space,
  },
});
