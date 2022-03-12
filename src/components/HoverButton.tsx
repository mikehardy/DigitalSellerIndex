import {useState} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {Button, useTheme} from 'react-native-paper';

export interface HoverButtonProps {
  onPress: (label: string) => void;
  buttonLabel: string;
  selected?: boolean;
}

export default function HoverButton(
  props: HoverButtonProps,
): JSX.Element | null {
  const theme = useTheme();
  const [hovered, setHovered] = useState(false);
  // const backgroundStyle = {backgroundColor: theme.colors.background, flex: 1};

  // We will make a dynamic set of colors based on the theme, so that:
  // 1- if we are selected we want to invert the button
  const dynamicStyles = StyleSheet.create({
    dynamicColors: {
      // if we are not hovered or focused we want the border to blend with background,
      // but we always want the border there (mode 'outlined') otherwise the layout jumps by borderWidth
      // when hover happens
      borderColor:
        hovered || props.selected
          ? theme.colors.background
          : theme.colors.primary,

      // If we are selected, we want to invert the button background and text
      color: props.selected ? theme.colors.surface : theme.colors.primary,
      backgroundColor: props.selected
        ? theme.colors.background
        : theme.colors.surface,
    },
  });

  return (
    <>
      <Pressable
        style={styles.buttonContainer}
        // @ts-ignore - because types don't have onHoverIn/onHoverOut - see react-native-web repo issues
        onHoverIn={() => setHovered(true)}
        onHoverOut={() => setHovered(false)}
        // onPress={props.onPress}
      >
        <Button
          mode="outlined"
          // eslint-disable-next-line react-native/no-inline-styles
          style={[dynamicStyles.dynamicColors, {borderWidth: 2}]}
          labelStyle={dynamicStyles.dynamicColors}
          onPress={() => {
            // console.log('hoverbutton: ' + props.buttonLabel);
            props.onPress(props.buttonLabel);
          }}>
          {props.buttonLabel}
        </Button>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 10,
  },
});
