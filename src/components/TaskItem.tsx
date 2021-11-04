import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { Task } from "../pages/Home";
import Icon from "react-native-vector-icons/Feather";
import editIcon from "../assets/icons/Edit.png";
import trashIcon from "../assets/icons/Trash.png";

interface TaskItemProps {
  item: Task;
  index: number;
  onPress: (id: number) => void;
  onLongPress: (id: number) => void;
  editTask(taskId: number, newTaskTitle: string): void;
}

export function TaskItem({
  item,
  index,
  onPress,
  onLongPress,
  editTask,
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(item.title);

  const textInputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (textInputRef.current) {
      if (isEditing) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isEditing]);

  function handleStartEditing() {
    setIsEditing(true);
  }

  function handleCancelEditing() {
    setNewTitle(item.title);
    setIsEditing(false);
  }

  function handleSubmitEditing() {
    editTask(item.id, newTitle);
    setIsEditing(false);
  }

  return (
    <View style={styles.containerTask}>
      <TouchableOpacity
        testID={`button-${index}`}
        activeOpacity={0.7}
        onPress={() => onPress(item.id)}
        style={item.done ? styles.taskButtonDone : styles.taskButton}
      >
        <View
          testID={`marker-${index}`}
          style={item.done ? styles.taskMarkerDone : styles.taskMarker}
        />
        <TextInput
          ref={textInputRef}
          value={newTitle}
          onChangeText={setNewTitle}
          onSubmitEditing={handleSubmitEditing}
          style={item.done ? styles.taskTextDone : styles.taskText}
          editable={isEditing}
          onBlur={handleSubmitEditing}
        />
      </TouchableOpacity>
      <View style={styles.iconsContainer}>
        {isEditing ? (
          <TouchableOpacity onPress={handleCancelEditing}>
            <Icon name="x" size={24} color="#b2b2b2" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleStartEditing}>
            <Image source={editIcon} />
          </TouchableOpacity>
        )}

        <View style={styles.iconsDivider} />

        <TouchableOpacity
          disabled={isEditing}
          onPress={() => onLongPress(item.id)}
        >
          <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1 }} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerTask: {
    flexDirection: "row",
    alignItems: "center",
  },
  taskButton: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#3D3D4D",
    marginRight: 10,
  },
  taskText: {
    color: "#3D3D4D",
  },
  taskButtonDone: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 4,
    borderRadius: 4,
    backgroundColor: "rgba(25, 61, 223, 0.1)",
    flexDirection: "row",
    alignItems: "center",
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 8,
    backgroundColor: "#273FAD",
    marginRight: 10,
  },
  taskTextDone: {
    color: "#A09CB1",
    textDecorationLine: "line-through",
  },
  iconsContainer: {
    marginLeft: 10,
    flexDirection: "row",
  },
  iconsDivider: {
    width: 1,
    height: 24,
    marginHorizontal: 10,
    backgroundColor: "rgba(196, 196, 196, 0.24)",
  },
});
