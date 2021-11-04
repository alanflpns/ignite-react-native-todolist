import React, { useState } from "react";
import { Alert } from "react-native";

import { Header } from "../components/Header";
import { MyTasksList } from "../components/MyTasksList";
import { TodoInput } from "../components/TodoInput";

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    if (!newTaskTitle) return null;
    if (tasks.find((task) => task.title === newTaskTitle))
      return Alert.alert("Você não pode cadastrar uma task com o mesmo nome");

    const id = new Date().getTime();
    const newTask = {
      id,
      title: newTaskTitle,
      done: false,
    };
    setTasks([...tasks, newTask]);
  }

  function handleMarkTaskAsDone(id: number) {
    const newTasks = [...tasks].map((task) =>
      task.id === id ? { ...task, done: !task.done } : { ...task }
    );
    setTasks(newTasks);
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Sim",
          onPress: () => {
            const newTasks = [...tasks].filter((task) => task.id !== id);
            setTasks(newTasks);
          },
        },
        { text: "Não", onPress: () => null },
      ]
    );
  }

  function handleEditTask(taskId: number, newTaskTitle: string) {
    const newTasks = [...tasks].map((task) =>
      task.id === taskId ? { ...task, title: newTaskTitle } : { ...task }
    );
    setTasks(newTasks);
  }

  return (
    <>
      <Header />

      <TodoInput addTask={handleAddTask} />

      <MyTasksList
        tasks={tasks}
        onPress={handleMarkTaskAsDone}
        onLongPress={handleRemoveTask}
        editTask={handleEditTask}
      />
    </>
  );
}
