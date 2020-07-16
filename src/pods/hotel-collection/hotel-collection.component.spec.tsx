import * as React from 'react';
import { render } from '@testing-library/react';
import { HotelCollectionComponent } from './hotel-collection.component';
import { HotelEntityVm } from './hotel-collection.vm';

describe('HotelCollection Component specs', () => {
  it('Should display a div container', () => {
    // Arrange
    const hotelCollection: HotelEntityVm[] = [];

    // Act
    const { getByTestId, unmount } = render(
      <HotelCollectionComponent hotelCollection={hotelCollection} />
    );
    const element = getByTestId('div-hotel-container');

    // Assert
    expect(element).toBeInTheDocument();
    unmount();
  });
  it('Should display a card with each hotel', async () => {
    // Arrange
    const hotelCollection: HotelEntityVm[] = [
      {
        address: 'test addres',
        description: 'test description',
        id: 'test id',
        name: 'test name',
        picture: 'test url',
        rating: 1,
      } as HotelEntityVm,
    ];

    // Act
    const { getByText } = render(
      <HotelCollectionComponent hotelCollection={hotelCollection} />
    );
    const element = getByText('test name');

    // Assert
    expect(element).toBeInTheDocument();
  });
});
