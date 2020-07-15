import * as React from 'react';
import { HotelEntityVm } from './hotel-collection.vm';
import { getHotelCollection } from './hotel-collection.api';
import { mapFromApiToVm } from './hotel-collection.mapper';
import { mapToCollection } from 'common/mappers';

const useSafeState = function <T>(
  initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const mountedRef = React.useRef(false);
  const [state, setState] = React.useState<T>(initialValue);

  React.useEffect(() => {
    mountedRef.current = true;
    return () => (mountedRef.current = false);
  }, []);

  const isMounted = () => mountedRef.current;

  const setSafeState = function (
    data: T
  ): React.Dispatch<React.SetStateAction<T>> | void {
    return isMounted() ? setState(data) : null;
  };

  return [state, setSafeState];
};

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
