import * as React from 'react';

export const useSafeState = function <T>(
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
