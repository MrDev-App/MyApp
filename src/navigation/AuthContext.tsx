import React, { createContext, useContext, useState, useEffect } from 'react';
import storage, { KEY } from '../utils/asyncStorage';

interface AuthContextType {
  isLoading: boolean;
  isFirstLaunch: boolean;
  userToken: string | null;
  isGuest: boolean;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  skipLogin: () => Promise<void>;
  completeOnboarding: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isFirstLaunch, setIsFirstLaunch] = useState(true);
  const [userToken, setUserToken] = useState<string | null>(null);
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    const loadStorageData = async () => {
      try {
        const firstLaunch = await storage.getItem(KEY.IS_FIRST_LAUNCH);
        const token = await storage.getItem(KEY.USER_TOKEN);

        setIsFirstLaunch(firstLaunch ?? true);
        setUserToken(token);
      } catch (e) {
        console.error(
          '[AuthContext] Failed to load auth state from storage',
          e,
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadStorageData();
  }, []);

  const login = async (token: string) => {
    setUserToken(token);
    setIsGuest(false);
    await storage.setItem(KEY.USER_TOKEN, token);
  };

  const logout = async () => {
    setUserToken(null);
    setIsGuest(false);
    await storage.deleteItem(KEY.USER_TOKEN);
  };

  const skipLogin = async () => {
    setIsGuest(true);
    setUserToken(null);
  };

  const completeOnboarding = async () => {
    setIsFirstLaunch(false);
    await storage.setItem(KEY.IS_FIRST_LAUNCH, false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        isFirstLaunch,
        userToken,
        isGuest,
        login,
        logout,
        skipLogin,
        completeOnboarding,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  console.log('context', context);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
