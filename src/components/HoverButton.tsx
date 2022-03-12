import {useState} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {Button, useTheme} from 'react-native-paper';
import {LayoutSize, useLayoutInfo} from './LayoutInfo';

export interface HoverButtonProps {
  onPress: (label: string) => void;
  buttonLabel: string;
  selected?: boolean;
}

export default function HoverButton(
  props: HoverButtonProps,
): JSX.Element | null {
  const theme = useTheme();
  const layoutInfo = useLayoutInfo();
  const [hovered, setHovered] = useState(false);

  // We will need dynamic styling to handle dimension change and theming
  const dynamicStyles = StyleSheet.create({
    buttonContainer: {
      alignContent: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      padding: layoutInfo.layoutSize === LayoutSize.small ? 0 : 0,
      margin: layoutInfo.layoutSize === LayoutSize.small ? 0 : 3,
      marginBottom: layoutInfo.layoutSize === LayoutSize.small ? 3 : 10,
      marginTop: layoutInfo.layoutSize === LayoutSize.small ? 3 : 10,
    },
    dynamicLabelSize: {
      fontSize: layoutInfo.layoutSize === LayoutSize.small ? 10 : 15,
      color: props.selected ? theme.colors.surface : theme.colors.background,
    },
    dynamicColors: {
      compact: true,
      // if we are not hovered or focused we want the border to blend with background,
      // but we always want the border there (mode 'outlined') otherwise the layout jumps by borderWidth
      // when hover happens
      borderColor:
        hovered || props.selected ? theme.colors.primary : theme.colors.primary,

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
        style={dynamicStyles.buttonContainer}
        // @ts-ignore - because types don't have onHoverIn/onHoverOut - see react-native-web repo issues
        onHoverIn={() => setHovered(true)}
        onHoverOut={() => setHovered(false)}>
        <Button
          mode="outlined"
          compact={true}
          // eslint-disable-next-line react-native/no-inline-styles
          style={[dynamicStyles.dynamicColors, {borderWidth: 2}]}
          labelStyle={[
            dynamicStyles.dynamicColors,
            dynamicStyles.dynamicLabelSize,
          ]}
          onPress={() => {
            props.onPress(props.buttonLabel);
          }}>
          {props.buttonLabel}
        </Button>
      </Pressable>
    </>
  );
}
