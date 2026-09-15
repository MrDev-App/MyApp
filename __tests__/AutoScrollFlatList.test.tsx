import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { render, fireEvent } from '@testing-library/react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AutoScrollFlatList, AutoScrollItem } from '../src/components/AutoScrollFlatList';

jest.mock('@react-navigation/native', () => ({
  useIsFocused: () => true,
  useNavigation: () => ({
    navigate: jest.fn(),
    jumpTo: jest.fn(),
  }),
}));

describe('AutoScrollFlatList', () => {
  it('renders list items and allows clicking on AutoScrollItem without blocking', async () => {
    const onPressItem = jest.fn();
    const mockData = [
      { id: '1', title: 'Item 1' },
      { id: '2', title: 'Item 2' },
    ];

    const { getByText } = await render(
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AutoScrollFlatList
          data={mockData}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <AutoScrollItem onPress={() => onPressItem(item)}>
              <Text>{item.title}</Text>
            </AutoScrollItem>
          )}
        />
      </GestureHandlerRootView>,
    );

    const firstItem = getByText('Item 1');
    expect(firstItem).toBeTruthy();

    fireEvent.press(firstItem);
    expect(onPressItem).toHaveBeenCalledTimes(1);
    expect(onPressItem).toHaveBeenCalledWith(mockData[0]);
  });

  it('allows clicking sibling buttons on the screen when AutoScrollFlatList is present', async () => {
    const onExternalButtonClick = jest.fn();
    const onDeityClick = jest.fn();

    const mockDeities = [
      { id: 'd1', name: 'Shiva' },
      { id: 'd2', name: 'Krishna' },
    ];

    const ScreenWithAutoScrollAndButtons = () => (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View>
          <TouchableOpacity
            testID="jap-card-button"
            onPress={onExternalButtonClick}
          >
            <Text>Start Naam Jap</Text>
          </TouchableOpacity>

          <AutoScrollFlatList
            data={mockDeities}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                testID={`deity-${item.id}`}
                onPress={() => onDeityClick(item)}
              >
                <Text>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </GestureHandlerRootView>
    );

    const { getByTestId } = await render(<ScreenWithAutoScrollAndButtons />);

    // Click external button (e.g. JapCard)
    const externalButton = getByTestId('jap-card-button');
    fireEvent.press(externalButton);
    expect(onExternalButtonClick).toHaveBeenCalledTimes(1);

    // Click deity inside AutoScrollFlatList
    const deityButton = getByTestId('deity-d1');
    fireEvent.press(deityButton);
    expect(onDeityClick).toHaveBeenCalledTimes(1);
    expect(onDeityClick).toHaveBeenCalledWith(mockDeities[0]);
  });
});
