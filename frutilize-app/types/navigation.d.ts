import { RootStackParamList, TabParamList } from '../app/navigation/Navigation';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}