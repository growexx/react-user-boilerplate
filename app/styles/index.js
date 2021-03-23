// COLOR-PALETTE
const lightPurple = 'hsl(259, 55%, 55%)';
// const purple = 'hsl(259, 66%, 47%)';
const darkPurple = 'hsl(259, 66%, 37%)';
const lightBlue = 'hsl(216, 100%, 98%)';
const blue = 'hsl(216, 100%, 65%)';
const darkBlue = 'hsl(216, 80%, 55%)';
const red = 'hsl(353, 64%, 67%)';
const darkRed = 'hsl(353, 64%, 60%)';
const orange = 'hsl(36, 96%, 59%)';
const green = 'hsl(140, 44%, 61%)';
const darkGreen = 'hsl(141, 44%, 51%)';
const lightBackgroundGreen =
  'linear-gradient(207.91deg, #3AADA1 0%, #3AB397 47.37%, #4DC196 100%)';
const lightGreen = '#3AB299';
const transparent = 'transparent';

// BRAND COLOR ALIASES
const brandBackgroundPrimary = lightBackgroundGreen;
const brandPrimary = lightGreen;
const brandPrimaryHover = darkPurple;
const brandSecondary = blue;
const brandSecondaryHover = darkBlue;
const brandDestructive = red; // error
const brandDestructiveHover = darkRed;
const brandWarning = orange;
const brandAffirmative = green; // success
const brandAffirmativeHover = darkGreen;

// GREY-SCALE
const black = '#111618';
const purpleBlack = 'hsl(262, 12%, 19%)';
const gray500 = 'hsl(223, 9%, 29%)';
const gray400 = 'hsl(218, 10%, 57%)';
const gray300 = 'hsl(223, 10%, 86%)';
const gray200 = 'hsl(225, 9%, 91%)';
const gray100 = 'hsl(220, 30%, 96%)';
const white = 'hsl(0, 0%, 100%)';
const transparentWhite = 'rgba(255, 255, 255, 65%)';

// MISC
const inputBg = gray100;
const baseBorderColor = gray200;

const colors = {
  brandBackgroundPrimary,
  brandPrimary,
  brandPrimaryHover,
  brandSecondary,
  brandSecondaryHover,
  brandDestructive,
  brandDestructiveHover,
  brandWarning,
  brandAffirmative,
  brandAffirmativeHover,
  lightPurple,
  lightBlue,
  black,
  transparent,
  purpleBlack,
  gray500,
  gray400,
  gray300,
  gray200,
  gray100,
  white,
  transparentWhite,
  inputBg,
  baseBorderColor,
};

export { colors };

// FONT-FAMILY
export const fontFamily = {
  fontRubik: '"Rubik", -apple-system, BlinkMacSystemFont, sans-serif',
  fontAg: 'autograph',
  fontEpilogue: 'Epilogue',
  fontMonospace: 'monospace',
  fontEpiOblique: 'Epilogue-Stamp',
};

// TYPOGRAPHY
const baseFontSize = 1; // 1rem or 16px
export const fontSizes = {
  f3: `${baseFontSize * 0.1875}rem`, // 3px
  f4: `${baseFontSize * 0.25}rem`, // 4px
  f5: `${baseFontSize * 0.3125}rem`, // 5px
  f6: `${baseFontSize * 0.375}rem`, // 6px
  f8: `${baseFontSize * 0.5}rem`, // 8px
  f9: `${baseFontSize * 0.5625}rem`, // 9px
  f10: `${baseFontSize * 0.625}rem`, // 10px
  f11: `${baseFontSize * 0.6875}rem`, // 11px
  f12: `${baseFontSize * 0.75}rem`, // 12px
  f13: `${baseFontSize * 0.8125}rem`, // 13px
  f14: `${baseFontSize * 0.875}rem`, // 14px
  f15: `${baseFontSize * 0.9375}rem`, // 15px
  f18: `${baseFontSize * 1.125}rem`, // 18px
  f20: `${baseFontSize * 1.25}rem`, // 20px
  f21: `${baseFontSize * 1.3125}rem`, // 21px
  f22: `${baseFontSize * 1.375}rem`, // 22px
  f24: `${baseFontSize * 1.5}rem`, // 24px
  f25: `${baseFontSize * 1.563}rem`, // 25px
  f26: `${baseFontSize * 1.625}rem`, // 26px
  f28: `${baseFontSize * 1.75}rem`, // 28px
  f31: `${baseFontSize * 1.938}rem`, // 31px
  f40: `${baseFontSize * 2.5}rem`, // 40px
  f42: `${baseFontSize * 2.63}rem`, // 42.08px
  f64: `${baseFontSize * 4}rem`, // 64px
};

// FONT-WEIGHTS
export const regular = 400;
export const medium = 500;
export const bold = 700;
export const fontWeights = {
  regular,
  medium,
  bold,
};

// LINE-HEIGHT
export const lineHeights = {
  standard: 1.6,
  small: 1.3,
  heading: 1.25,
  reset: 1,
};

// SCALE
export const text = {
  h1: {
    fontSize: fontSizes.f64,
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.heading,
  },
  h2: {
    fontSize: fontSizes.f40,
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.heading,
  },
  h3: {
    fontSize: fontSizes.f28,
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.heading,
  },
  h4: {
    fontSize: fontSizes.f20,
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.heading,
  },
  h5: {
    fontSize: fontSizes.f18,
    fontWeight: fontWeights.medium,
    lineHeight: lineHeights.standard,
  },
};

// SPACING (Based on an 8pt scale)
const baseSpacing = 0.5; // 8px or 0.5rem
export const space = {
  sSpacing: `${baseSpacing / 2}rem`, // 4px
  mSpacing: `${baseSpacing * 2}rem`, // 16px
  lSpacing: `${baseSpacing * 3}rem`, // 24px
  xlSpacing: `${baseSpacing * 4}rem`, // 32px
  xxlSpacing: `${baseSpacing * 6}rem`, // 48px
};

// SIZES
export const sizes = {
  baseBorderWidth: `1px`,
  baseBorderRadius: `4px`,
  baseInputHeight: space.xxlSpacing,
  baseCheckboxSize: space.mSpacing * 1.25,
};

// BOX-SHADOWS
export const shadows = {
  baseBoxShadow: '0px 2px 4px rgba(17, 22, 24, 0.08);',
  darkBoxShadow: '0px 3px 5px rgba(17, 22, 24, 0.15);',
  cardBoxShadow: `0 0 10px ${colors.gray200}`,
  brandInputBoxShadow: `inset 0 0 0 1px ${colors.brandSecondary}`,
  brandInputBoxDestructiveShadow: `inset 0 0 0 1px ${colors.brandDestructive}`,
};

// BORDERS
export const borders = {
  baseBorder: `1px solid ${colors.baseBorderColor}`,
  avatarBorder: `2px solid ${colors.white}`,
  lightBorder: `1px solid ${colors.gray100}`,
};

// Z-INDEX
export const zIndices = [0, 9, 99, 999, 9999];

// TEXT-FORMAT
export const textFormat = {
  block: {
    flexDirection: 'column',
  },
  inline: {
    flexDirection: 'row',
  },
};

// MEDIA-QUERIES
const createMediaQuery = n => `@media screen and (min-width:${n})`;

const addAliases = (arr, aliases) =>
  aliases.forEach((key, i) =>
    Object.defineProperty(arr, key, {
      enumerable: false,
      get() {
        return this[i];
      },
    }),
  );

// BREAK-POINTS
export const breakpoints = [32, 40, 48, 64].map(n => `${n}em`);

export const mediaQueries = breakpoints.map(createMediaQuery);

const aliases = ['sm', 'md', 'lg', 'xl'];

addAliases(breakpoints, aliases);
addAliases(mediaQueries, aliases);

// PAGE WRAPPER
export const maxContainerWidth = '1280px';

// EXPORT THEME
const theme = {
  breakpoints,
  mediaQueries,
  space,
  sizes,
  fontSizes,
  fontWeights,
  lineHeights,
  regular,
  bold,
  text,
  colors,
  borders,
  shadows,
  zIndices,
  textFormat,
  maxContainerWidth,
  fontFamily,
};

export default theme;
