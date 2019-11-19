import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList, Dimensions, YellowBox } from 'react-native';
import IndicatorList from './IndicatorList';

YellowBox.ignoreWarnings(['Remote debugger']);
const { width } = Dimensions.get('window');

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      data: [],
    };
  }

  componentDidMount() {
    const { data } = this.state;
    for (let i = 0; i < 10; i += 1) {
      data.push(`Data ${i}`);
    }
    this.setState({
      loading: false,
      data,
    });
  }

  render() {
    const { loading, data } = this.state;
    if (loading) {
      return (
        <View style={styles.container} >
          <Text style={styles.loadText}>Loading</Text>
        </View>
      );
    }

    return (
      <View style={styles.container} >
        <FlatList
          data={data}
          keyExtractor={item => (item)}
          initialNumToRender={9}
          // 为了避免动态测量，加入了以下属性。
          getItemLayout={(d, index) => ({ length: 100, offset: 100 * index, index })}
          renderItem={({ item }) => (
            <Text style={styles.item} >
              {item}
            </Text>)
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadText: {
    fontSize: 18,
    color: 'red',
  },
  item: {
    backgroundColor: '#efefef',
    width,
    height: 100,
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    borderTopColor: '#666666',
    borderTopWidth: 1,
    textAlignVertical: 'center',
  }
});
