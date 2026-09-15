import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import JapCard from '../src/screens/home/components/JapCard';
import { Storage, STORAGE_KEYS } from '../src/services/storageService';
import { Translation } from '../src/i18n/language';

const mockUseNavigation = jest.fn();

jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => mockUseNavigation(),
    useIsFocused: () => true,
  };
});

describe('JapCard Navigation on iOS & Android', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Storage.set(STORAGE_KEYS.JAP_TODAY_COUNT, 108);
    Storage.set(STORAGE_KEYS.JAP_TODAY_MALA, 1);
  });

  it('renders JapCard with stats and title', async () => {
    mockUseNavigation.mockReturnValue({
      jumpTo: jest.fn(),
      navigate: jest.fn(),
    });

    const { getByTestId, getByText } = await render(<JapCard />);
    expect(getByTestId('jap-card')).toBeTruthy();
    expect(getByText(Translation.JAP_TITLE)).toBeTruthy();
    expect(getByTestId('jap-today-count').props.children).toBe(108);
    expect(getByTestId('jap-today-mala').props.children).toBe(1);
  });

  it('navigates directly using jumpTo when rendered inside Tab Navigator (iOS bottom tabs)', async () => {
    const mockJumpTo = jest.fn();
    const mockNavigate = jest.fn();

    mockUseNavigation.mockReturnValue({
      jumpTo: mockJumpTo,
      navigate: mockNavigate,
    });

    const { getByTestId } = await render(<JapCard />);
    const chantButton = getByTestId('start-chanting-btn');
    fireEvent.press(chantButton);

    expect(mockJumpTo).toHaveBeenCalledWith('Jap');
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('navigates using navigate("Jap") when jumpTo is not available (Stack Navigator context)', async () => {
    const mockNavigate = jest.fn();

    mockUseNavigation.mockReturnValue({
      navigate: mockNavigate,
    });

    const { getByTestId } = await render(<JapCard />);
    const chantButton = getByTestId('start-chanting-btn');
    fireEvent.press(chantButton);

    expect(mockNavigate).toHaveBeenCalledWith('Jap');
  });
});
