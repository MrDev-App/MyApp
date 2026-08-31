import { StyleSheet } from 'react-native';
import { scale } from './sizes';

const Globalstyles = StyleSheet.create({
  containerFull: {
    flex: 1,
  },
  containerMargin20: {
    flex: 1,
    marginHorizontal: scale(20),
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Globalstyles;
