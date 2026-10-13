import type { TurboModule } from 'react-native';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  setItem(key: string, value: string): Promise<boolean>;
  getItem(key: string): Promise<string | null>;
}

export default TurboModuleRegistry.get<Spec>('SharedStorage');
