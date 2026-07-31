export type RootStackParams = {
  Tab: undefined;
  Stack: undefined;
};

export type BottomTabParams = {
  Home: undefined;
  Profile: undefined;
};

export type StackParams = {
  Splash: undefined;
  BottomTabs: undefined;
  ProfileUpdate: undefined;
};
export type AuthParams = {
  Onboarding: undefined;
  Language: undefined;
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  Otp: undefined;
  ResetPassword: undefined;
};

export interface StackNavigationProps {
  isFirstLaunch?: boolean | string;
  userToken?: string | null;
  userProfile?: object | null;
}
