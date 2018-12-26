import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';

export default class Header extends React.Component {
  render() {
    const { value, onChange, onAddItem, onToggleAllComplete } = this.props;
    return (
      <View style={styles.header}>
        <TouchableOpacity onPress={onToggleAllComplete}>
          <Text style={styles.toggleIcon}>{String.fromCharCode(10003)}</Text>
        </TouchableOpacity>
        <TextInput
          placeholder="What needs to be done ?"
          blurOnSubmit={false}
          returnKeyType="done"
          style={styles.input}
          value={value}
          onChangeText={onChange}
          onSubmitEditing={onAddItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    height: 50,
    marginLeft: 16,
    marginTop: 5
  },
  toggleIcon: {
    fontSize: 30,
    color: '#CCC'
  },
  header: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  }
});
