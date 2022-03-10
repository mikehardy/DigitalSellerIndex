import {useState} from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';

export interface HoverButtonProps {
  onPress: (label: string) => void;
  buttonLabel: string;
  selected?: boolean;
}

export default function HoverButton(
  props: HoverButtonProps,
): JSX.Element | null {
  // const theme = useTheme();
  const [hovered, setHovered] = useState(false);
  // const backgroundStyle = {backgroundColor: theme.colors.background, flex: 1};

  return (
    <Pressable
      style={styles.buttonContainer}
      // @ts-ignore - because types don't have onHoverIn/onHoverOut - see react-native-web repo issues
      onHoverIn={() => setHovered(true)}
      onHoverOut={() => setHovered(false)}
      // onPress={props.onPress}
    >
      <Button
        mode={hovered || props.selected ? 'outlined' : 'text'}
        onPress={() => {
          console.log('hoverbutton: ' + props.buttonLabel);
          props.onPress(props.buttonLabel);
        }}>
        {props.buttonLabel}
      </Button>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
