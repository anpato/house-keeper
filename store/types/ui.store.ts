import { Theme } from '../../constants/enums/theme.enum';

export interface UiStore {
  additionModalVisible: boolean;
  listDialogVisible: boolean;
  theme: Theme;
}
