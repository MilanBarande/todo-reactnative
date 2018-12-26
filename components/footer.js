import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default class Footer extends React.Component {
  render() {
    const { filter, count } = this.props;
    return (
      <View style={styles.container}>
        <Text>{count} left</Text>
        <View style={styles.filters}>
          <TouchableOpacity
            style={[styles.filter, filter === 'ALL' && styles.selected]}
            onPress={() => this.props.onFilter('ALL')}
          >
            <Text>All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filter, filter === 'ACTIVE' && styles.selected]}
            onPress={() => this.props.onFilter('ACTIVE')}
          >
            <Text>Active</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.filter, filter === 'COMPLETED' && styles.selected]}
            onPress={() => this.props.onFilter('COMPLETED')}
          >
            <Text>Completed</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={this.props.onClearCompleted}>
          <Text>Clear Completed</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  filters: {
    flexDirection: 'row'
  },
  filter: {
    padding: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'transparent'
  },
  selected: {
    borderColor: 'rgba(175, 47, 47, .2)'
  }
});
