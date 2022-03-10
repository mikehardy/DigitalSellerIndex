import {ScaledSize} from 'react-native';
import {useDimensions} from '@react-native-community/hooks';
import {useEffect, useState} from 'react';

export const enum LayoutSize {
  'small' = 'small',
  'medium' = 'medium',
  'large' = 'large',
}

export const enum LayoutOrientation {
  'landscape' = 'landscape',
  'portrait' = 'portrait',
}

export type LayoutInfo = {
  window: ScaledSize;
  screen: ScaledSize;
  orientation: LayoutOrientation;
  layoutSize: LayoutSize;
  hasBeenSmall: boolean; // FIXME required until drawer navigator re-renders correctly on mode switch from slide to permanent
};

export function useLayoutInfo(): LayoutInfo {
  const {screen, window} = useDimensions();
  let orientation = LayoutOrientation.portrait;
  let layoutSize = LayoutSize.medium;

  // if we are landscape, swap width and height
  if (window.width > window.height) {
    orientation = LayoutOrientation.landscape;
  }

  // get more specific with our layout breakpoints in case medium doesn't fit
  if (window.width <= 640) {
    layoutSize = LayoutSize.small;
  } else if (window.width >= 1008) {
    layoutSize = LayoutSize.large;
  }

  const [hasBeenSmall, setHasBeenSmall] = useState(
    layoutSize !== LayoutSize.large,
  );

  useEffect(() => {
    if (!hasBeenSmall && layoutSize !== LayoutSize.large) {
      setHasBeenSmall(true);
    }
  }, [layoutSize, hasBeenSmall]);

  const layoutInfo = {
    screen,
    window,
    orientation,
    layoutSize,
    hasBeenSmall,
  };

  return layoutInfo;
}
