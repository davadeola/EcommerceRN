import React from 'react';
import {View, Text, Animated} from 'react-native';

import {TextButton} from '../../components';
import {COLORS, SIZES, constants, FONTS} from '../../constants';

const Walkthrough = () => {
  const scrollX = React.useRef(new Animated.Value(0)).current;

  return (
    <View style={{flex: 1, backgroundColor: COLORS.light}}>
      <Animated.FlatList
        data={constants.walkthrough}
        keyExtractor={item => item.id}
        horizontal
        snapToInterval={SIZES.width}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false},
        )}
        renderItem={({item, index}) => (
          <View style={{width: SIZES.width, justifyContent: 'center'}}>
            {/* Walkthrough Images */}
            <View
              style={{
                flex: 1,
              }}></View>

            {/* Title & Description */}
            <View
              style={{
                height: SIZES.height * 0.35,
                alignItems: 'center',
                justifyContent: 'flex-start',
                paddingHorizontal: SIZES.padding,
              }}>
              <Text style={{...FONTS.h1}}>{item.title}</Text>
              <Text
                style={{
                  ...FONTS.h4,
                  marginTop: SIZES.radius,
                  textAlign: 'center',
                  color: COLORS.gray,
                }}>
                {item.sub_title}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default Walkthrough;
