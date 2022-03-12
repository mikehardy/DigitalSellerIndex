// In order to use RNVI for web, you need to consume the ttf files in your JavaScript entry point to get the bundled url and inject a style tag in your page
// https://github.com/oblador/react-native-vector-icons#web-with-webpack

import MaterialCommunityIcons_ttf from 'react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf';

// Generate required css
const IconsCSS = `
@font-face {
  src: url(${MaterialCommunityIcons_ttf});
  font-family: MaterialCommunityIcons;
}
`;

// Create stylesheet
const style = document.createElement('style');
style.type = 'text/css';
if (style.styleSheet) {
  style.styleSheet.cssText = IconsCSS;
} else {
  style.appendChild(document.createTextNode(IconsCSS));
}

// Inject stylesheet
document.head.appendChild(style);
