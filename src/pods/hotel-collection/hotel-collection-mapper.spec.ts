import * as apiModel from './hotel-collection.api';
import * as viewModel from './hotel-collection.vm';
import { mapFromApiToVm } from './hotel-collection.mapper';
import { basePicturesUrl } from 'core';

describe('hotel collection mapper specs', () => {
  it('should return default data hotel when hotel equal undefined', () => {
    // Arrange
    const hotel: apiModel.HotelEntityApi = undefined;

    // Act
    const result = mapFromApiToVm(hotel);

    // Assert
    expect(result).toEqual(viewModel.defaultEntityVm());
  });

  it('should return default data hotel when hotel equal null ', () => {
    // Arrange
    const hotel: apiModel.HotelEntityApi = null;

    // Act
    const result = mapFromApiToVm(hotel);

    // Assert
    expect(result).toEqual(viewModel.defaultEntityVm());
  });

  it('should return data hotel when hotel is ok', () => {
    // Arrange
    const hotel = {
      id: 'test id',
      thumbNailUrl: 'test url',
      name: 'test name',
      shortDescription: 'test description',
      hotelRating: 0,
      address1: 'test address',
    } as apiModel.HotelEntityApi;

    // Act
    const result = mapFromApiToVm(hotel);

    // Assert
    expect(result).toEqual({
      id: 'test id',
      picture: `${basePicturesUrl}test url`,
      name: 'test name',
      description: 'test description',
      rating: 0,
      address: 'test address',
    } as viewModel.HotelEntityVm);
  });
});
