/* eslint-disable react-native/no-inline-styles */
import React, {useState, useLayoutEffect} from 'react';
import {TouchableOpacity, View, Animated, Text} from 'react-native';
import usePrevious from 'react-use-previous';
import hexToHsl from 'hex-to-hsl';

const getHSLString = (color) => {
  const [h, s, l] = hexToHsl(color);
  return 'hsl(' + h + ',' + s + '%,' + l + '%)';
};

const ColorCard = ({color, onPress}) => {
  const [animation] = useState(new Animated.Value(0));
  const prevColor = usePrevious(color)?.current || color;

  useLayoutEffect(() => {
    animation.setValue(0);
    Animated.timing(animation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [animation, color]);

  return (
    <TouchableOpacity
      style={{width: '50%', height: 180, padding: 5}}
      onPress={onPress}>
      <View
        style={{
          padding: 5,
          backgroundColor: '#fff',
          borderRadius: 15,
          height: '100%',
        }}>
        <Animated.View
          style={{
            backgroundColor: animation.interpolate({
              inputRange: [0, 1],
              outputRange: [getHSLString(prevColor), getHSLString(color)],
            }),
            padding: 10,
            borderRadius: 10,
            flex: 1,
          }}
        />
        <View
          style={{
            paddingVertical: 5,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: 16}}>{color}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ColorCard;
