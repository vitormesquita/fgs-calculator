/// <reference types="nativewind/types" />

declare module '*.png' {
  const value: import('react-native').ImageSourcePropType;
  export default value;
}

declare module '*.jpg' {
  const value: import('react-native').ImageSourcePropType;
  export default value;
}

declare module '*.svg' {
  import type { FC } from 'react';
  import type { SvgProps } from 'react-native-svg';
  const content: FC<SvgProps>;
  export default content;
}

declare module '@expo-google-fonts/montserrat' {
  export const Montserrat_400Regular: import('expo-font').FontSource;
  export const Montserrat_500Medium: import('expo-font').FontSource;
  export const Montserrat_600SemiBold: import('expo-font').FontSource;
  export const Montserrat_700Bold: import('expo-font').FontSource;
}
