import { Linking } from 'react-native';
import { navigationRef } from '@navigation/navigationRef';

const SCHEME = 'guruvani://';
const PENDING_TTL_MS = 30000; // parchi 30 sec tak valid

type DeepLinkTarget = 'Jap' | 'Calendar' | 'Book';

let pending: { target: DeepLinkTarget; at: number } | null = null;

// URL -> tab ka naam. Naye links yahin jodna.
const parseUrl = (url?: string | null): DeepLinkTarget | null => {
  if (!url || !url.startsWith(SCHEME)) return null;
  const path = url.slice(SCHEME.length).replace(/\/+$/, '').toLowerCase();
  if (path === 'japscreen' || path === 'jap' || path === 'mantras') return 'Jap';
  if (path === 'calendar' || path === 'calendarscreen') return 'Calendar';
  if (path === 'book' || path === 'books' || path === 'bookscreen') return 'Book';
  return null;
};

// BottomTabs stack me aa chuka hai? (Splash/Onboarding khatam)
const isTabsReady = () =>
  navigationRef.isReady() &&
  !!navigationRef.getRootState()?.routes.some(r => r.name === 'BottomTabs');

const goTo = (target: DeepLinkTarget) => {
  navigationRef.navigate('BottomTabs', { screen: target });
};

export const handleDeepLink = (url?: string | null) => {
  console.log('[DeepLink] url:', url);
  const target = parseUrl(url);
  if (!target) return;

  if (isTabsReady()) {
    goTo(target);
  } else {
    pending = { target, at: Date.now() }; // parchi jeb me
  }
};

// BottomNavigation mount hone par call hota hai
export const consumePendingDeepLink = () => {
  if (!pending) return;
  const { target, at } = pending;
  pending = null;
  if (Date.now() - at > PENDING_TTL_MS) return;
  goTo(target);
};

export const initDeepLinks = () => {
  Linking.getInitialURL().then(handleDeepLink); // app band thi (cold start)
  const sub = Linking.addEventListener('url', e => handleDeepLink(e.url)); // app chal rahi thi
  return () => sub.remove();
};
