import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { Icon, Input, ButtonGroup } from 'react-native-elements';

export default function App() {
  const [todoList, setTodoList] = useState([]);
  const [deletedList, setDeletedList] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [newTask, setNewTask] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(null);
  const [viewFilter, setViewFilter] = useState(0); // 0 - All, 1 - Ongoing, 2 - Completed, 3 - Deleted

  // Add new task
  const addTask = () => {
    if (!newTask) return;
    if (isEditing) {
      setTodoList(todoList.map(item => item.id === currentTaskId ? { ...item, task: newTask } : item));
      setIsEditing(false);
      setCurrentTaskId(null);
    } else {
      setTodoList([...todoList, { id: Date.now().toString(), task: newTask, completed: false }]);
    }
    setNewTask('');
  };

  // Edit task
  const editTask = (id, task) => {
    setIsEditing(true);
    setNewTask(task);
    setCurrentTaskId(id);
  };

  // Delete task
  const deleteTask = id => {
    const taskToDelete = todoList.find(item => item.id === id);
    setTodoList(todoList.filter(item => item.id !== id));
    if (taskToDelete) {
      setDeletedList([...deletedList, taskToDelete]);
    }
  };

  // Restore task
  const restoreTask = id => {
    const taskToRestore = deletedList.find(item => item.id === id);
    setDeletedList(deletedList.filter(item => item.id !== id));
    if (taskToRestore) {
      setTodoList([...todoList, taskToRestore]);
    }
  };

  // Mark as completed
  const toggleComplete = id => {
    setTodoList(todoList.map(item => item.id === id ? { ...item, completed: !item.completed } : item));
  };

  // Filtered list based on search and view filter
  const filteredList = (() => {
    const activeList = todoList.filter(item => item.task.toLowerCase().includes(searchText.toLowerCase()));
    
    if (viewFilter === 0) return activeList; // All tasks
    if (viewFilter === 1) return activeList.filter(item => !item.completed); // Ongoing tasks
    if (viewFilter === 2) return activeList.filter(item => item.completed);  // Completed tasks
    if (viewFilter === 3) return deletedList.filter(item => item.task.toLowerCase().includes(searchText.toLowerCase())); // Deleted tasks
  })();

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <Input
        placeholder="Search..."
        value={searchText}
        onChangeText={setSearchText}
        leftIcon={<Icon name="search" type="font-awesome" />}
        containerStyle={styles.searchBar}
      />

      {/* View Filter Buttons */}
      <ButtonGroup
        buttons={['All', 'Ongoing', 'Completed', 'Deleted']}
        selectedIndex={viewFilter}
        onPress={setViewFilter}
        containerStyle={styles.buttonGroup}
      />

      {/* Task List */}
      <FlatList
        data={filteredList}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            {viewFilter === 3 ? ( // Render for Deleted List
              <>
                <Text style={styles.taskText}>{item.task}</Text>
                <TouchableOpacity onPress={() => restoreTask(item.id)}>
                  <Icon name="undo" type="font-awesome" size={18} color="blue" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => editTask(item.id, item.task)} style={styles.iconSpacing}>
                  <Icon name="edit" type="font-awesome" size={18} color="green" />
                </TouchableOpacity>
              </>
            ) : ( // Render for Active List
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
                  <TouchableOpacity onPress={() => editTask(item.id, item.task)}>
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

      {/* Input field to add/edit tasks */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add new task..."
          value={newTask}
          onChangeText={setNewTask}
        />
        <TouchableOpacity onPress={addTask}>
          <Icon name={isEditing ? "save" : "plus-circle"} type="font-awesome" size={30} color="green" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  searchBar: {
    marginBottom: 20,
  },
  buttonGroup: {
    marginBottom: 20,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  taskText: {
    fontSize: 18,
    flex: 1,
    marginLeft: 10,
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 60,
  },
  iconSpacing: {
    marginLeft: 10, // Add margin to create space between icons
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginRight: 10,
    borderRadius: 5,
  },
});
