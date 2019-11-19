import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated, FlatList, StyleSheet, View, ViewPropTypes } from 'react-native';

export default class IndicatorList extends Component {
    static propTypes = {
      data: PropTypes.array,
      extraData: PropTypes.any,
      keyExtractor: PropTypes.func,
      renderItem: PropTypes.func,
      style: ViewPropTypes.style,
      indicatorStyle: ViewPropTypes.style,
    }

    static defaultProps = {
      data: [],
      extraData: null,
      keyExtractor: null,
      renderItem: null,
      style: null,
      indicatorStyle: null,
    }

    constructor(props) {
      super(props);
      this.state = {
        indicator: new Animated.Value(0),
        contentHeight: 1, // 整体内容高度
        containHeight: 0// 当前列表View的高度
      };
    }


    render() {
      const { data, extraData, keyExtractor, renderItem, style, indicatorStyle } = this.props;
      const { indicator, contentHeight, containHeight } = this.state;
      const indicatorSize = contentHeight > containHeight ? containHeight * containHeight / contentHeight : 0;
      const difference = containHeight > indicatorSize ? containHeight - indicatorSize : 1;
      return (
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <FlatList
            onContentSizeChange={(width, height) => {
              this.setState({ contentHeight: height });
            }}
            onLayout={({ nativeEvent: { layout: { height } } }) => {
              this.setState({ containHeight: height });
            }}
            onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: indicator } } }])}
            initialNumToRender={9}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            extraData={extraData}
            data={data}
            keyExtractor={keyExtractor}
            style={style}
            renderItem={renderItem}
          />

          <Animated.View style={[
            styles.indicator, {
              ...indicatorStyle,
              height: indicatorSize,
              transform: [{
                translateY: Animated.multiply(indicator, containHeight / contentHeight).interpolate({
                  inputRange: [0, difference],
                  outputRange: [0, difference],
                  extrapolate: 'clamp'
                })
              }]
            }]}
          />
        </View>
      );
    }
}

const styles = StyleSheet.create({
  indicator: {
    position: 'absolute',
    right: 0,
    width: 3,
    backgroundColor: '#F4676C',
    borderRadius: 1,
  }
});

