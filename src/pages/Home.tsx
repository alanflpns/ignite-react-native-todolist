import React, { useState } from 'react';

import { Header } from '../components/Header';
import { MyTasksList } from '../components/MyTasksList';
import { TodoInput } from '../components/TodoInput';

interface Task {
  id: number;
  title: string;
  done: boolean;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    if(!newTaskTitle) return null

    const id = new Date().getTime()
    const newTask = {
      id,
      title: newTaskTitle,
      done: false
    }
    setTasks([...tasks, newTask])
  }

  function handleMarkTaskAsDone(id: number) {
    const newTasks = [...tasks].map(task => task.id === id ? {...task, done: !task.done} : {...task})
    setTasks(newTasks)
  }

  function handleRemoveTask(id: number) {
    const newTasks = [...tasks].filter(task => task.id !== id)
    setTasks(newTasks)
  }

  return (
    <>
      <Header />

      <TodoInput addTask={handleAddTask} />

      <MyTasksList 
        tasks={tasks} 
        onPress={handleMarkTaskAsDone} 
        onLongPress={handleRemoveTask} 
      />
    </>
  )
}