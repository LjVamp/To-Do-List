import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { styles } from '../styles';


export default function AddTaskInput({ newTask, setNewTask, addTask, isEditing }) {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Add new task..."
        value={newTask}
        onChangeText={setNewTask}
        onSubmitEditing={addTask}
        returnKeyType="done"
      />
      <TouchableOpacity onPress={addTask}>
        <Icon name={isEditing ? "save" : "plus-circle"} type="font-awesome" size={30} color="#5F6F65" />
      </TouchableOpacity>
    </View>
  );
}
