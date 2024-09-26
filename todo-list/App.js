import React, { useState } from 'react';
import { View } from 'react-native';
import { Input, ButtonGroup } from 'react-native-elements';
import { styles } from './styles';  // Import styles
import TaskList from './TaskList';  // Import TaskList component
import AddTaskInput from './AddTaskInput';  // Import AddTaskInput component

export default function App() {
  const [todoList, setTodoList] = useState([]);
  const [deletedList, setDeletedList] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [newTask, setNewTask] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(null);
  const [viewFilter, setViewFilter] = useState(0); // 0 - All, 1 - Ongoing, 2 - Completed, 3 - Deleted

  // Functions for task operations: addTask, editTask, deleteTask, restoreTask, toggleComplete
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
        leftIcon={{ name: 'search', type: 'font-awesome' }}
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
      <TaskList
        tasks={filteredList}
        viewFilter={viewFilter}
        toggleComplete={toggleComplete}
        editTask={editTask}
        deleteTask={deleteTask}
        restoreTask={restoreTask}
      />

      {/* Add Task Input */}
      <AddTaskInput
        newTask={newTask}
        setNewTask={setNewTask}
        addTask={addTask}
        isEditing={isEditing}
      />
    </View>
  );
}
