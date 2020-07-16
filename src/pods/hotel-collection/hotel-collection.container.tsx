import * as React from 'react';
import { HotelCollectionComponent } from './hotel-collection.component';
import { useHotelCollection } from './hotel-collection.hook';

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

export const HotelCollectionContainer = () => {
  const { hotelCollection, loadHotelCollection } = useHotelCollection();

  const setSafeHotelCollection = () => loadHotelCollection();

  React.useEffect(() => {
    setSafeHotelCollection();
  }, []);

  return <HotelCollectionComponent hotelCollection={hotelCollection} />;
};
