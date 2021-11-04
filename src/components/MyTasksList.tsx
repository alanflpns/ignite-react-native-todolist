import React from "react";
import { FlatList, View, Text, StyleSheet } from "react-native";
import { TaskItem } from "./TaskItem";

function FlatListHeaderComponent() {
  return (
    <View>
      <Text style={styles.header}>Minhas tasks</Text>
    </View>
  );
}

interface MyTasksListProps {
  tasks: {
    id: number;
    title: string;
    done: boolean;
  }[];
  onPress: (id: number) => void;
  onLongPress: (id: number) => void;
  editTask(taskId: number, newTaskTitle: string): void;
}

export function MyTasksList({
  tasks,
  onLongPress,
  onPress,
  editTask,
}: MyTasksListProps) {
  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item, index }) => (
        <TaskItem
          item={item}
          index={index}
          onLongPress={onLongPress}
          onPress={onPress}
          editTask={editTask}
        />
      )}
      ListHeaderComponent={<FlatListHeaderComponent />}
      ListHeaderComponentStyle={{
        marginBottom: 20,
      }}
      style={{
        marginHorizontal: 24,
        marginTop: 32,
      }}
    />
  );
}

const styles = StyleSheet.create({
  header: {
    color: "#3D3D4D",
    fontSize: 24,
    fontFamily: "Poppins-SemiBold",
  },
});
