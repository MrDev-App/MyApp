# Production Naming Conventions & Codebase Standards

This document establishes the architecture, folder structure, and naming conventions for GuruVani (MyApp). All contributors must follow these rules.

---

## 1. Directory Architecture

```
src/
├── assets/          # Static media (images, fonts, raw SVGs, videos)
├── components/      # Shared reusable UI components (common, icons, modals)
├── constants/       # App constants, seed records, storage keys
├── hooks/           # Shared reusable custom React hooks (plural)
├── i18n/            # Localization setup and translation dictionaries
├── navigation/      # Stack & Tab navigators, route types, navigation refs
├── screens/         # Feature screen modules with co-located components/
├── services/        # Business logic, Firebase, MMKV, Notifee notifications
├── theme/           # Design system tokens (colors, fonts, sizes, globalStyles)
└── types/           # Global TypeScript domain definitions
```

---

## 2. Naming Rulebook

| Category | Convention | Rule & Example |
|---|---|---|
| **React Component Files** | `PascalCase.tsx` | Must match primary component name (`HomeScreen.tsx`, `AnimatedButton.tsx`). |
| **Custom Hook Files** | `camelCase.ts` | Must start with `use` (`useAutoScroll.ts`, `useProfileData.ts`). |
| **Service & Util Files** | `camelCase.ts` | Descriptive noun/verb (`storageService.ts`, `sizes.ts`, `colors.ts`). |
| **Type Files** | `types.ts` or `*.types.ts`| Centralized per domain or feature (`types.ts`). |
| **Components** | `PascalCase` | Standard functional component: `export const HomeScreen: React.FC = ...` |
| **Hooks** | `camelCase` with `use` | `export const useAutoScroll = (...) => { ... }` |
| **Functions & Handlers** | `camelCase`, verb-first | Action-oriented: `fetchGodData`, `calculateDaysRemaining`, `handlePress` |
| **Booleans** | `camelCase` (`is`/`has`/`can`/`should`) | `isLoading`, `hasError`, `isFocused`, `isMounted`, `hasPermission` |
| **Collections & Lists** | Plural `camelCase` | `festivals`, `categories`, `mantras`, `notifications` |
| **Constants** | `SCREAMING_SNAKE_CASE` | `STORAGE_KEYS`, `SHORT_MONTHS`, `DEFAULT_NOTIFICATIONS` |
| **Storage & Cache Keys** | Centralized in `STORAGE_KEYS` | `STORAGE_KEYS.ONBOARDING_COMPLETED` (never raw string literals) |
| **Types & Interfaces** | `PascalCase` (no `I` prefix) | `Festival`, `AppNotification`, `GodItem`, `RootStackParamList` |
| **Routes** | `PascalCase` (no redundant `Screen` suffix)| `Home`, `Jap`, `Book`, `Profile`, `AllFestivals`, `Reading`, `Search` |
| **Imports** | Path Aliases (`@...`) | `@components/*`, `@screens/*`, `@services/*`, `@theme/*`, `@constants/*`, `@hooks/*`, `@assets/*`, `@navigation/*`, `@types/*` |

---

## 3. Import Order Convention

1. **Core / Third-party libraries** (`react`, `react-native`, `@react-navigation/*`, `react-native-reanimated`)
2. **Internal Path Aliased modules** (`@components/*`, `@screens/*`, `@services/*`, `@theme/*`, `@constants/*`, `@hooks/*`)
3. **Co-located local imports** (`./components/ChildComponent`, `./styles/localStyles`)

---

## 4. Path Aliases Reference

```json
{
  "@assets/*": ["src/assets/*"],
  "@components/*": ["src/components/*"],
  "@constants/*": ["src/constants/*"],
  "@hooks/*": ["src/hooks/*"],
  "@navigation/*": ["src/navigation/*"],
  "@screens/*": ["src/screens/*"],
  "@services/*": ["src/services/*"],
  "@theme/*": ["src/theme/*"],
  "@types/*": ["src/types/*"],
  "@utils/*": ["src/utils/*"]
}
```
