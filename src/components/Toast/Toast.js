import React, { useState, useCallback, useImperativeHandle, forwardRef } from "react";
import { Text, Image, Platform } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, useAnimatedGestureHandler, withSequence, withDelay, withSpring, runOnJS, withTiming } from "react-native-reanimated";
import { PanGestureHandler } from 'react-native-gesture-handler';

import styles from "./style";
const Toast = forwardRef(({ }, ref) => {
  const [showing, setShowing] = useState(false);
  const [toastType, setToastType] = useState('success');
  const [toastText, setToastText] = useState('Toast Success')
  const [toastDur, setToastDur] = useState(0);


  const toastTopAnimation = useSharedValue(-100);
  const TOP_VALUE = Platform.OS === 'ios' ? 60 : 50;

  const show = useCallback(({ type, text, duration }) => {
    setShowing(true)
    setToastText(text); setToastType(type);
    setToastDur(duration);
    toastTopAnimation.value = withSequence(
      withTiming(TOP_VALUE),
      withDelay(duration, withTiming(-100, finish => {
        if (finish) {
          runOnJS(setShowing)(false);
        }
      }
      )
      )
    )
  }, []);
  const animatedTopStyle = useAnimatedStyle(() => {
    return {
      top: toastTopAnimation.value,

    }
  })
  useImperativeHandle(ref, () => ({
    show
  }), [show])


  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startY = toastTopAnimation.value
    },
    onActive: (event, ctx) => {
      if (event.translationY < 100) {
        toastTopAnimation.value = withSpring(ctx.startY + event.translationY, {
          damping: 600,
          stiffness: 100,
        })
      }
    }, onEnd: (event) => {
      if (event.translationY < 0) {
        toastTopAnimation.value = withTiming(-100, finish => {
          if (finish) {
            runOnJS(setShowing)(false);
          }
        })
      } else if (event.translationY > 0) {
        toastTopAnimation.value = withSequence(withTiming(TOP_VALUE, withDelay(toastDur, withTiming(-100, finish => {
          if (finish) {
            runOnJS(setShowing)(false)
          }
        }))))
      }
    }
  })
  return (
    <>
      {showing && (
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View style={[styles.container, toastType === 'success' ? styles.successToastCon :
            toastType === 'warning' ? styles.warningToastCon : styles.errorToastCon, animatedTopStyle]}>

            <Image source={toastType === 'success' ? require('./../../../assets/SuccessIcon.png') :
              toastType === 'warning' ? require('./../../../assets/WarningIcon.png') : require('./../../../assets/ErrorIcon.png')} style={styles.toastIcon} />
            <Text style={[styles.toastText, toastType === 'success' ? styles.successText :
              toastType === 'warning' ? styles.warningText : styles.errorText]}>
              {toastText}
            </Text>
          </Animated.View>
        </PanGestureHandler>

      )}
    </>
  )
})

export default Toast;
