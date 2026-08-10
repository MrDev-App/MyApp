export const fonts = {
  PoppinsLight: 'Poppins-Light',
  PoppinsRegular: 'Poppins-Regular',
  PoppinsMedium: 'Poppins-Medium',
  PoppinsSemiBold: 'Poppins-SemiBold',
  PoppinsBold: 'Poppins-Bold',
} as const;

export type FontType = keyof typeof fonts;

export default fonts;
