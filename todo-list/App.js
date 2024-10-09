import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Input } from 'react-native-elements';
import { styles } from './styles';
import TaskList from './components/TaskList';
import AddTaskInput from './components/AddTaskInput';

export default function App() {
  const [todoList, setTodoList] = useState([]);
  const [deletedList, setDeletedList] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [newTask, setNewTask] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(null);
  const [viewFilter, setViewFilter] = useState(0);

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

  const editTask = (id, task) => {
    setIsEditing(true);
    setNewTask(task);
    setCurrentTaskId(id);
  };

  const deleteTask = id => {
    const taskToDelete = todoList.find(item => item.id === id);
    setTodoList(todoList.filter(item => item.id !== id));
    if (taskToDelete) {
      setDeletedList([...deletedList, taskToDelete]);
    }
  };

  const restoreTask = id => {
    const taskToRestore = deletedList.find(item => item.id === id);
    setDeletedList(deletedList.filter(item => item.id !== id));
    if (taskToRestore) {
      setTodoList([...todoList, taskToRestore]);
    }
  };

  const toggleComplete = id => {
    setTodoList(todoList.map(item => item.id === id ? { ...item, completed: !item.completed } : item));
  };

  const filteredList = (() => {
    const activeList = todoList.filter(item => item.task.toLowerCase().includes(searchText.toLowerCase()));
    if (viewFilter === 0) return activeList;
    if (viewFilter === 1) return activeList.filter(item => !item.completed);
    if (viewFilter === 2) return activeList.filter(item => item.completed);
    if (viewFilter === 3) return deletedList.filter(item => item.task.toLowerCase().includes(searchText.toLowerCase()));
  })();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TO-DO LIST</Text>
      <Input
        placeholder="Search..."
        value={searchText}
        onChangeText={setSearchText}
        leftIcon={{ name: 'search', type: 'font-awesome' }}
        containerStyle={styles.searchBar}
      />
      
      {/* Updated ButtonGroup */}
      <View style={styles.buttonGroup}>
        {['All', 'Ongoing', 'Completed', 'Deleted'].map((buttonTitle, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setViewFilter(index)}
            style={[
              styles.button,
              viewFilter === index ? styles.buttonSelected : null
            ]}
          >
            <Text style={viewFilter === index ? styles.buttonTextSelected : styles.buttonText}>
              {buttonTitle}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TaskList
        tasks={filteredList}
        viewFilter={viewFilter}
        toggleComplete={toggleComplete}
        editTask={editTask}
        deleteTask={deleteTask}
        restoreTask={restoreTask}
      />

      <AddTaskInput
        newTask={newTask}
        setNewTask={setNewTask}
        addTask={addTask}
        isEditing={isEditing}
      />
    </View>
  );
}
