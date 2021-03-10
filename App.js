/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Animated,
} from 'react-native';
import randonColor from 'randomcolor';

import ColorCard from './src/components/ColorCard';
import ToastBar from './src/components/ToastBar';

const getColor = () => {
  return randonColor({
    luminosity: 'light',
    hue: 'random',
  });
};

const get5New = () => {
  return [getColor(), getColor(), getColor(), getColor(), getColor()];
};

const App = () => {
  const [colors, setColors] = useState(get5New());
  const [selectedColor, setSelectedColor] = useState();
  const [animatedValue] = useState(new Animated.Value(0));

  useEffect(() => {
    if (selectedColor) {
    }
  }, [selectedColor]);

  useEffect(() => {
    if (selectedColor) {
      animatedValue.setValue(0);
      Animated.sequence([
        Animated.spring(animatedValue, {
          toValue: 1,
          useNativeDriver: true,
        }),
        Animated.delay(1000),
        Animated.spring(animatedValue, {
          toValue: 0,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [animatedValue, selectedColor]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.toastPosition,
          {
            transform: [
              {
                translateY: animatedValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-100, 0],
                }),
              },
            ],
          },
        ]}>
        <ToastBar color={selectedColor} />
      </Animated.View>
      <ScrollView style={{flex: 1}}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
          }}>
          <Text style={styles.title}>Color pallete generator</Text>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}>
            {colors.map((color, index) => {
              return (
                <ColorCard
                  key={index}
                  color={color}
                  onPress={() => {
                    setSelectedColor(color);
                  }}
                />
              );
            })}
          </View>
        </View>
      </ScrollView>
      <View>
        <TouchableOpacity
          style={styles.generateButton}
          onPress={() => {
            setColors(get5New());
          }}>
          <Text style={{color: '#FFF', fontSize: 18}}>generate pallete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 50,
    paddingHorizontal: 20,
    backgroundColor: '#E8ECF3',
  },
  title: {
    fontSize: 34,
    color: '#0a102c',
    textAlign: 'center',
    marginBottom: 30,
  },
  generateButton: {
    backgroundColor: '#7e6cca',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 6,
    shadowColor: '#7e6cca',
    borderRadius: 5,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toastPosition: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    zIndex: 10,
  },
});

export default App;
