import {useColorScheme} from 'react-native';
import {darkTheme, defaultTheme} from '../theme';
import {Theme as PaperTheme} from 'react-native-paper/lib/typescript/types';
import {Theme as NavigationTheme} from '@react-navigation/native';

export type AppSettings = {
  colorScheme: string;
  currentTheme: PaperTheme & NavigationTheme;
};

export const useAppSettings = (): AppSettings => {
  const colorScheme = useColorScheme();

  return {
    colorScheme: colorScheme ?? 'light',
    currentTheme: colorScheme === 'light' ? defaultTheme : darkTheme,
  };
};
