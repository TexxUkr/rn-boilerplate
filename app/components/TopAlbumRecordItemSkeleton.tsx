import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export const dummyArray = Array.from({ length: 15 }, (_, i) => `Item ${i + 1}`);

const TopAlbumRecordItemSkeleton = () => (
  <SkeletonPlaceholder>
    <SkeletonPlaceholder.Item width={'100%'} height={80} borderRadius={15} />
  </SkeletonPlaceholder>
);

export default TopAlbumRecordItemSkeleton;
