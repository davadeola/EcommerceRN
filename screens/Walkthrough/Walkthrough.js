import React from 'react';
import {View, Text, Animated} from 'react-native';

import {TextButton} from '../../components';
import {COLORS, SIZES, constants, FONTS} from '../../constants';
import Walkthrough1 from './Walkthrough1';
import Walkthrough2 from './Walkthrough2';

const Walkthrough = () => {
  //set state to allow trigger of animation only when on second screen
  const [walkthrough2Animate, setWalkThrough2Animate] = React.useState(false);

  const onViewChangedRef = React.useRef(({viewableItems, changed}) => {
    if (viewableItems[0].index == 1) {
      //second walkthrough screen
      setWalkThrough2Animate(true);
    }
  });

  //get the scroll position of the Animated class component
  const scrollX = React.useRef(new Animated.Value(0)).current;

  const Dots = () => {
    //get current screen
    const dotPosition = Animated.divide(scrollX, SIZES.width);

    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        {constants.walkthrough.map((item, index) => {
          const dotColor = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [COLORS.dark08, COLORS.primary, COLORS.dark08],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={`dot-${index}`}
              style={{
                borderRadius: 5,
                marginHorizontal: 6,
                width: 10,
                height: 10,
                backgroundColor: dotColor,
              }}
            />
          );
        })}
      </View>
    );
  };

  const renderFooter = () => (
    <View
      style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: SIZES.height * 0.2,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SIZES.padding,
        paddingVertical: SIZES.height > 700 ? SIZES.padding : 20,
      }}>
      <Dots />

      {/* Buttons */}

      <View style={{flexDirection: 'row', height: 55}}>
        <TextButton
          label="Join Now"
          contentContainerStyle={{
            flex: 1,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.lightGrey,
          }}
          labelStyle={{
            color: COLORS.primary,
            ...FONTS.h3,
          }}
        />
        <TextButton
          label="Log In"
          contentContainerStyle={{
            flex: 1,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.lightGrey,
            marginLeft: SIZES.radius,
            backgroundColor: COLORS.primary,
          }}
          labelStyle={{
            ...FONTS.h3,
          }}
        />
      </View>
    </View>
  );

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
        onViewableItemsChanged={onViewChangedRef.current}
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
                justifyContent: 'center',
              }}>
              {index == 0 && <Walkthrough1 />}
              {index == 1 && <Walkthrough2 animate={walkthrough2Animate} />}
            </View>

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
      {renderFooter()}
    </View>
  );
};

export default Walkthrough;
