import { view } from './storybook.requires';
import { asyncGetItem, asyncSetItem } from '../app/utils/storage/storage';

const StorybookUIRoot = view.getStorybookUI({
  storage: {
    getItem: asyncGetItem,
    setItem: asyncSetItem,
  },
});

export default StorybookUIRoot;
