import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { TasksList } from '../components/TasksList';
import { Task } from '../components/TaskItem';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleEditTask(taskId: number, taskNewTitle: string) {
    setTasks(prevState => prevState.map(task => {
      if (task.id === taskId) {
        task.title = taskNewTitle
      }
      return task;
    }));
  }

  function handleAddTask(newTaskTitle: string) {
    const taskExist = tasks.find(task => task.title === newTaskTitle);
    if (taskExist) {
      Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome');
      return;
    }
    const task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    }
    setTasks(prevState => [...prevState, task]);
  }

  function handleToggleTaskDone(id: number) {
    setTasks(prevState => prevState.map(task => {
      if (task.id === id) {
        task.done = !task.done
      }
      return task;
    }));
  }

  function handleRemoveTask(id: number) {
    Alert.alert('Remover item', 'Tem certeza que você deseja remover esse item?', [
      {
        text: 'Não',
      },
      {
        text: 'Sim',
        onPress: () => setTasks(prevState => prevState.filter(task => task.id !== id)),
      }
    ], { cancelable: true })
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})