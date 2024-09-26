import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Icon } from 'react-native-elements';
import { styles } from './styles';  // Import styles

export default function TaskList({ tasks, viewFilter, toggleComplete, editTask, deleteTask, restoreTask }) {
  return (
    <FlatList
      data={tasks}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <View style={styles.listItem}>
          {viewFilter === 3 ? ( // Deleted tasks view
            <>
              <Text style={styles.taskText}>{item.task}</Text>
              <TouchableOpacity onPress={() => restoreTask(item.id)}>
                <Icon name="undo" type="font-awesome" size={18} color="blue" />
              </TouchableOpacity>
            </>
          ) : ( // Active tasks view
            <>
              <TouchableOpacity onPress={() => toggleComplete(item.id)}>
                <Icon
                  name={item.completed ? "check-circle" : "circle"}
                  type="font-awesome"
                  color={item.completed ? "green" : "gray"}
                />
              </TouchableOpacity>
              <Text style={[styles.taskText, item.completed && styles.completedTask]}>{item.task}</Text>
              <View style={styles.icons}>
                <TouchableOpacity onPress={() => editTask(item.id)}>
                  <Icon name="edit" type="font-awesome" size={18} color="blue" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => deleteTask(item.id)}>
                  <Icon name="trash" type="font-awesome" size={18} color="red" />
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      )}
    />
  );
}
