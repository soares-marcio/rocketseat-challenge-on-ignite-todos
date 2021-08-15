import React, {useState, useRef, useEffect} from 'react';
import { View, TextInput, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import trashIcon from '../assets/icons/trash/trash.png'
import editIcon from '../assets/icons/edit/edit.png'

export interface Task {
  id: number;
  title: string;
  done: boolean;
}
export type toggleTaskDoneProps = (id: number) => any;
export type removeTaskProps = (id: number) => any;
export type editTaskProps = (id: number, title: string) => any;

export function TaskItem({
  removeTask,
  toggleTaskDone,
  index,
  item,
  editTask }: {
    index: number,
    item: Task,
    removeTask: removeTaskProps,
    toggleTaskDone: toggleTaskDoneProps,
    editTask: editTaskProps
  }) {

  const [isEditing, setIsEditing] = useState(false);
  const [titleEditing, setTitleEditing] = useState(item.title);
  const textInputRef = useRef<TextInput>(null)

  function handleStartEditing() {
    setIsEditing(true);
  }

  function handleCancelEditing() {
    setTitleEditing(item.title);
    setIsEditing(false);
  }

  function handleSubmitEditing() {
    editTask(item.id, titleEditing);
    setIsEditing(false);
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (isEditing) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [isEditing])

  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(item.id)}
        >
          <View
            testID={`marker-${index}`}
            style={ item.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            { item.done && (
              <Icon
                name="check"
                size={12}
                color="#FFF"
              />
            )}
          </View>

          <TextInput
            ref={textInputRef}
            style={item.done ? styles.taskTextDone : styles.taskText}
            value={titleEditing}
            editable={isEditing}
            onChangeText={setTitleEditing}
            onSubmitEditing={handleSubmitEditing}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.iconContainer}>
        {
          isEditing ? (
            <TouchableOpacity onPress={handleCancelEditing}>
              <Icon name='x' size={24} color='#b2b2b2' />
            </TouchableOpacity>
          ) : (
              <TouchableOpacity onPress={handleStartEditing}>
                <Image source={editIcon}/>
              </TouchableOpacity>
          )
        }
        <View style={styles.iconDivider}/>
        <TouchableOpacity
          disabled={isEditing}
          onPress={() => removeTask(item.id)}
        >
          <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1 }}/>
        </TouchableOpacity>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 24,
  },
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  },
  iconDivider: {
    borderBottomColor: '#ccc',
    padding: 10
  },
})
