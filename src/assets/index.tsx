import Back from './svg/Back.svg';
import Forward from './svg/Forward.svg';
import Bell from './svg/bell.svg';

import FoldedHands from './svg/foldedhands.svg';

const imagePath = {
  Back,
  Forward,
  greeting: require('./png/greeting.webp'),
  lotus: require('./png/lotus.webp'),

  OnBoarding: [
    require('./png/OnBoarding1.webp'),
    require('./png/OnBoarding2.webp'),
    require('./png/OnBoarding3.webp'),
  ],

  MalaMoti: require('./png/MalaMoti.webp'),

  user: require('./png/user.webp'),
  profile: require('./png/user.webp'),
  pencil: require('./png/pencil.webp'),

  TextIncrease: require('./png/text_increase.png'),
  TextDecrease: require('./png/text_decrease.png'),

  Logo: require('./png/Logo.webp'),
  Vibration: require('./png/Vibration.webp'),
  VibrationOff: require('./png/VibrationOff.webp'),

  books: require('./png/books.webp'),
  mala: require('./png/mala.webp'),
  calendarTab: require('./png/calendarTab.png'),
  star: require('./png/star.webp'),
  warning: require('./png/warning.webp'),
  fallBackImage: require('./png/fallBackImage.jpg'),
  Bell: require('./png/Bell.webp'),
  calendar: require('./png/calendar.webp'),
  letter: require('./png/letter.png'),
  lamp: require('./png/lamp.webp'),
  shlok: require('./png/shlok.webp'),
  shlokasFallback: require('./png/shlokasFallback.webp'),
  temples: require('./png/temples.webp'),
  clock: require('./png/clock.webp'),

  loading: require('./lottie/loading.json'),
  lampLottie: require('./lottie/lamp.json'),

  // audio and video
  bhaktiVideo: require('./video/bhakti.mp4'),
};

export { Back, Forward, Bell, FoldedHands };
export default imagePath;
