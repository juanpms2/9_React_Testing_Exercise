import * as React from 'react';
import { HotelEntityVm } from './hotel-collection.vm';
import { getHotelCollection } from './hotel-collection.api';
import { mapFromApiToVm } from './hotel-collection.mapper';
import { mapToCollection } from 'common/mappers';
import { useSafeState } from 'common/hooks';

export const useHotelCollection = () => {
  const [hotelCollection, setHotelCollection] = useSafeState<HotelEntityVm[]>(
    []
  );

  const setSafeHotelCollection = (hotelCollection) =>
    setHotelCollection(hotelCollection);

  const loadHotelCollection = () => {
    getHotelCollection().then((result) =>
      setSafeHotelCollection(mapToCollection(result, mapFromApiToVm))
    );
  };

  return { hotelCollection, loadHotelCollection };
};
