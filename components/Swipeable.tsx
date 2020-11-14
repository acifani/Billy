import { useTheme } from '@react-navigation/native';
import React, { useCallback, useRef } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Swipeable, {
  SwipeableProperties,
} from 'react-native-gesture-handler/Swipeable';

interface Action {
  text: string;
  callback: () => void;
  backgroundColor: string;
}

interface Props {
  leftAction: Action;
  rightActions: Action[];
}

export const SwipeableRow: React.FC<Props> = ({
  leftAction,
  rightActions,
  children,
}) => {
  const swipeableRowRef = useRef<Swipeable>(null);
  const theme = useTheme();

  const close = useCallback(() => {
    swipeableRowRef.current?.close();
  }, []);

  const leftActionCallback = useCallback(() => {
    close();
    leftAction.callback();
  }, [close, leftAction.callback]);

  const renderLeftActions: SwipeableProperties['renderLeftActions'] = (
    progress,
    dragX
  ) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100, 101],
      outputRange: [-20, 0, 0, 1],
    });

    return (
      <RectButton
        style={{
          ...styles.leftAction,
          backgroundColor: leftAction.backgroundColor,
        }}
        onPress={leftActionCallback}
      >
        <Animated.Text
          style={[
            styles.actionText,
            {
              transform: [{ translateX: trans }],
            },
          ]}
        >
          {leftAction.text}
        </Animated.Text>
      </RectButton>
    );
  };

  const renderRightAction = (
    text: string,
    color: string,
    x: number,
    progress: Animated.AnimatedInterpolation,
    callback: Action['callback']
  ) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [x, 0],
    });

    const pressHandler = () => {
      close();
      callback();
    };

    return (
      <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
        <RectButton
          style={[styles.rightAction, { backgroundColor: color }]}
          onPress={pressHandler}
        >
          <Text style={styles.actionText}>{text}</Text>
        </RectButton>
      </Animated.View>
    );
  };

  const renderRightActions: SwipeableProperties['renderRightActions'] = (
    progress
  ) =>
    rightActions.length > 0 && (
      <View style={{ width: rightActions.length * 64 }}>
        {rightActions.map((action, idx) =>
          renderRightAction(
            action.text,
            action.backgroundColor,
            64 * (idx + 1),
            progress,
            action.callback
          )
        )}
      </View>
    );

  return (
    <Swipeable
      ref={swipeableRowRef}
      friction={2}
      leftThreshold={40}
      rightThreshold={40}
      onSwipeableLeftOpen={leftActionCallback}
      renderLeftActions={renderLeftActions}
      renderRightActions={renderRightActions}
      containerStyle={{ ...styles.row, borderColor: theme.colors.border }}
    >
      {children}
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  row: {
    borderStyle: 'solid',
    borderBottomWidth: 1,
  },
  leftAction: {
    flex: 1,
    justifyContent: 'center',
  },
  actionText: {
    color: 'white',
    fontSize: 20,
    backgroundColor: 'transparent',
    padding: 10,
  },
  rightAction: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
