import { useTheme } from '@react-navigation/native';
import * as React from 'react';
import {
  ButtonProps as DefaultButtonProps,
  Text as DefaultText,
  TextInput as DefaultTextInput,
  View as DefaultView,
} from 'react-native';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

interface ThemeProps {
  lightColor?: string;
  darkColor?: string;
}

interface ButtonOwnProps {
  primary?: boolean;
}

export type ButtonProps = DefaultButtonProps & ThemeProps & ButtonOwnProps;

export type TextProps = ThemeProps & DefaultText['props'];
export type TextInputProps = ThemeProps & DefaultTextInput['props'];
export type ViewProps = ThemeProps & DefaultView['props'];

export function Text({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: TextProps) {
  const theme = useTheme();

  return (
    <DefaultText
      style={[{ color: theme.colors.text }, style]}
      {...otherProps}
    />
  );
}

export function View({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ViewProps) {
  const theme = useTheme();

  return (
    <DefaultView
      style={[{ backgroundColor: theme.colors.background }, style]}
      {...otherProps}
    />
  );
}

export function TextInput({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: TextInputProps) {
  const theme = useTheme();

  return (
    <DefaultTextInput
      style={[{ color: theme.colors.text }, style]}
      {...otherProps}
    />
  );
}
