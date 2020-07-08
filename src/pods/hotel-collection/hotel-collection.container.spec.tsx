import * as React from 'react';
import { render } from '@testing-library/react';
import { HotelCollectionContainer } from './hotel-collection.container';
import * as hook from './hotel-collection.hook';
import { HotelEntityVm } from './hotel-collection.vm';

describe('hotel-collection.container specs', () => {
  it('Should called hook when it mounts component', () => {
    // Arrange
    const useHotelCollectionStub = jest.spyOn(hook, 'useHotelCollection');
    const hotelCollection = [{} as HotelEntityVm];

    // Act
    const {} = render(<HotelCollectionContainer />);

    // Assert
    expect(useHotelCollectionStub).toHaveBeenCalled();
  });

  it('Should called hook when it mounts component', () => {
    // Arrange
    const useHotelCollectionStub = jest.spyOn(hook, 'useHotelCollection');
    const loadHotelCollection = jest.fn();
    const hotelCollection = [{} as HotelEntityVm];

    // Act
    const { getByTestId } = render(<HotelCollectionContainer />);
    const element = getByTestId('container');

    // Assert
    expect(element).toBeInTheDocument();
  });
});
