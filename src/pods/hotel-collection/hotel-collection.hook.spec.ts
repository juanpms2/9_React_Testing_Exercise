import { renderHook, act } from '@testing-library/react-hooks';
import { useHotelCollection } from './hotel-collection.hook';
import * as api from './hotel-collection.api';
import { mapFromApiToVm } from './hotel-collection.mapper';
import * as mapFunction from 'common/mappers';
import Axios from 'axios';
import { HotelEntityVm } from './hotel-collection.vm';

// jest.mock('common/mappers', () => ({ mapToCollection: jest.fn() }));

describe('hotell-collection-hook specs', () => {
  it('should return hotelCollection equals empty array and loadHotelCollection equals function', () => {
    // Arrange

    // Act
    const { result } = renderHook(() => useHotelCollection());

    // Assert
    expect(result.current.hotelCollection).toEqual([]);
    expect(result.current.loadHotelCollection).toEqual(expect.any(Function));
  });

  it('should call getHotelCollection when loadHotelCollection is called', async () => {
    // Arrange
    const mockApiHotelCollection: api.HotelEntityApi[] = [
      {
        address1: 'test addres1',
        id: 'test id1',
        shortDescription: 'test description1',
        name: 'test name1',
        thumbNailUrl: 'test picture1',
        hotelRating: 1,
      } as api.HotelEntityApi,
      {
        address1: 'test addres2',
        id: 'test id2',
        shortDescription: 'test description2',
        name: 'test name2',
        thumbNailUrl: 'test picture2',
        hotelRating: 2,
      } as api.HotelEntityApi,
    ];

    const getHotelCollectionStub = jest
      .spyOn(api, 'getHotelCollection')
      .mockResolvedValue(mockApiHotelCollection);

    const getHotelCollection = jest.fn();

    // Act
    const { result, waitForNextUpdate } = renderHook(() =>
      useHotelCollection()
    );

    act(() => {
      result.current.loadHotelCollection();
    });

    // Assert
    await waitForNextUpdate();

    expect(getHotelCollectionStub).toHaveBeenCalled();
  });
  it('should call mapToCollection when loadHotelCollection is called', async () => {
    // Arrange
    const mockApiHotelCollection: api.HotelEntityApi[] = [
      {
        address1: 'test addres1',
        id: 'test id1',
        shortDescription: 'test description1',
        name: 'test name1',
        thumbNailUrl: 'test picture1',
        hotelRating: 1,
      } as api.HotelEntityApi,
      {
        address1: 'test addres2',
        id: 'test id2',
        shortDescription: 'test description2',
        name: 'test name2',
        thumbNailUrl: 'test picture2',
        hotelRating: 2,
      } as api.HotelEntityApi,
    ];

    const mapToCollectionStub = jest.spyOn(mapFunction, 'mapToCollection');

    const getHotelCollectionStub = jest
      .spyOn(api, 'getHotelCollection')
      .mockResolvedValue(mockApiHotelCollection);

    // Act
    const { result, waitForNextUpdate } = renderHook(() =>
      useHotelCollection()
    );

    act(() => {
      result.current.loadHotelCollection();
    });

    // Assert
    await waitForNextUpdate();
    expect(mapToCollectionStub).toHaveBeenCalled();
  });

  it('Should return hotelCollection equals mapResult when loadHotelCollection is called', async () => {
    // Arrange
    const mockApiHotelCollection: api.HotelEntityApi[] = [
      {
        address1: 'test addres1',
        id: 'test id1',
        shortDescription: 'test description1',
        name: 'test name1',
        thumbNailUrl: 'test picture1',
        hotelRating: 1,
      } as api.HotelEntityApi,
      {
        address1: 'test addres2',
        id: 'test id2',
        shortDescription: 'test description2',
        name: 'test name2',
        thumbNailUrl: 'test picture2',
        hotelRating: 2,
      } as api.HotelEntityApi,
    ];

    const getHotelCollectionStub = jest
      .spyOn(Axios, 'get')
      .mockResolvedValue({ data: mockApiHotelCollection });

    const mapResult = mapFunction.mapToCollection(
      mockApiHotelCollection,
      mapFromApiToVm
    );

    // Act
    const { result, waitForNextUpdate } = renderHook(() =>
      useHotelCollection()
    );

    act(() => {
      result.current.loadHotelCollection();
    });

    // Assert
    await waitForNextUpdate();
    expect(result.current.hotelCollection).toEqual(mapResult);
  });
});
