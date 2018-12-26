import React from 'react';
import {
  StyleSheet,
  View,
  ListView,
  Keyboard,
  AsyncStorage,
  ActivityIndicator
} from 'react-native';
import Header from './components/header';
import Footer from './components/footer';
import Row from './components/row';

const filterItems = (filter, items) =>
  items.filter(item => {
    if (filter === 'ACTIVE') return !item.complete;
    if (filter === 'COMPLETED') return item.complete;
    return item;
  });

export default class App extends React.Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      value: '',
      items: [],
      allComplete: false,
      dataSource: ds.cloneWithRows([]),
      filter: 'ALL',
      loading: true
    };
  }
  componentDidMount() {
    AsyncStorage.getItem('items').then(json => {
      try {
        const items = JSON.parse(json);
        this.setSource(items, items, { loading: false });
      } catch (e) {
        this.setState({ loading: false });
      }
    });
  }
  setSource = (items, itemsDataSource, otherState = {}) => {
    this.setState({
      items,
      dataSource: this.state.dataSource.cloneWithRows(itemsDataSource),
      ...otherState
    });
    AsyncStorage.setItem('items', JSON.stringify(items));
  };
  handleAddItem = () => {
    const { value, items } = this.state;
    if (!value) {
      return;
    }
    const newItems = [
      ...items,
      {
        key: Date.now(),
        text: value,
        complete: false
      }
    ];
    this.setSource(newItems, filterItems(this.state.filter, newItems), { value: '' });
  };
  handleFilter = filter => {
    const { items } = this.state;
    this.setSource(items, filterItems(filter, items), { filter });
  };
  handleToggleComplete = (key, complete) => {
    const newItems = this.state.items.map(item => {
      if (item.key !== key) {
        return item;
      }
      return {
        ...item,
        complete
      };
    });
    this.setSource(newItems, filterItems(this.state.filter, newItems));
  };
  handleUpdateText = (key, text) => {
    const newItems = this.state.items.map(item => {
      if (item.key !== item) {
        return item;
      }
      return {
        ...item,
        text
      };
    });
    this.setSource(newItems, filterItems(this.state.filter, newItems));
  };
  handleToggleEditing = (key, editing) => {
    const newItems = this.state.items.map(item => {
      if (item.key !== item) {
        return item;
      }
      return {
        ...item,
        editing
      };
    });
    this.setSource(newItems, filterItems(this.state.filter, newItems));
  };
  handleToggleAllComplete = () => {
    const { allComplete, items } = this.state;
    const complete = !allComplete;
    const newItems = items.map(item => ({
      ...item,
      complete
    }));
    this.setSource(newItems, filterItems(this.state.filter, newItems), { allComplete: complete });
  };
  handleRemoveItem = key => {
    const newItems = this.state.items.filter(item => item.key !== key);
    this.setSource(newItems, filterItems(this.state.filter, newItems));
  };
  handleClearCompleted = () => {
    const newItems = filterItems('ACTIVE', this.state.items);
    this.setSource(newItems, filterItems(this.state.filter, newItems));
  };
  render() {
    return (
      <View style={styles.container}>
        <Header
          value={this.state.value}
          onAddItem={this.handleAddItem}
          onChange={value => this.setState({ value })}
          onToggleAllComplete={this.handleToggleAllComplete}
        />
        <View style={styles.content}>
          <ListView
            style={styles.list}
            enableEmptySections
            dataSource={this.state.dataSource}
            onScroll={() => Keyboard.dismiss()}
            renderRow={({ key, ...value }) => (
              <Row
                key={key}
                {...value}
                onComplete={complete => this.handleToggleComplete(key, complete)}
                onRemove={() => {
                  this.handleRemoveItem(key);
                }}
                onUpdate={text => this.handleUpdateText(key, text)}
                onToggleEdit={editing => this.handleToggleEditing(key, editing)}
              />
            )}
            renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
          />
        </View>
        <Footer
          onFilter={this.handleFilter}
          filter={this.state.filter}
          count={filterItems('ACTIVE', this.state.items).length}
          onClearCompleted={this.handleClearCompleted}
        />

        <View style={styles.loading}>
          {this.state.loading && <ActivityIndicator animating size="large" />}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingTop: 30
  },
  content: {
    flex: 1
  },
  list: {
    backgroundColor: '#FFF'
  },
  separator: {
    borderWidth: 1,
    borderColor: '#F5F5F5'
  },
  loading: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0, 0.2)'
  }
});
