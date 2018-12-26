import React, { Component } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, TextInput } from 'react-native';

class Row extends Component {
  render() {
    const { text, complete, onComplete, onRemove, onUpdate, onToggleEdit, editing } = this.props;
    const textComponent = (
      <View style={styles.textWrap} onLongPress={() => onToggleEdit(true)}>
        <Text style={[styles.text, complete && styles.complete]}>{text}</Text>
      </View>
    );
    const removeButton = (
      <TouchableOpacity onPress={onRemove}>
        <Text style={styles.destroy}>X</Text>
      </TouchableOpacity>
    );
    const editingButton = (
      <View style={styles.textWrap}>
        <TextInput onChangeText={onUpdate} autoFocus value={text} style={styles.input} multiline />
      </View>
    );
    const doneButton = (
      <TouchableOpacity style={styles.done} onPress={() => onToggleEdit(false)}>
        <Text style={styles.doneText}>Save</Text>
      </TouchableOpacity>
    );
    return (
      <View style={styles.container}>
        <Switch value={complete} onValueChange={onComplete} />
        {editing ? editingButton : textComponent}
        {editing ? doneButton : removeButton}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  },
  textWrap: {
    flex: 1,
    marginHorizontal: 16
  },
  input: {
    height: 100,
    flex: 1,
    fontSize: 24,
    padding: 0,
    color: '#4D4D4D'
  },
  complete: {
    textDecorationLine: 'line-through'
  },
  text: {
    fontSize: 24,
    color: '#4D4D4D'
  },
  destroy: {
    fontSize: 24,
    color: '#cc9a9a'
  },
  done: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#7BE290',
    padding: 7
  },
  doneText: {
    color: '#4D4D4D',
    fontSize: 20
  }
});

export default Row;
