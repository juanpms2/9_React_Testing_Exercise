import { mapToCollection } from './collection.mapper';
import * as vm from 'pods/hotel-collection/hotel-collection.vm';

describe('collection-mapper specs', () => {
  it('should return an empty array when collection not equals an array', () => {
    // Arrange
    const collection = undefined;
    const mapFunction = () => {};

    // Act
    const result = mapToCollection(collection, mapFunction);
    // Assert
    expect(result).toEqual([]);
  });

  it('should return a map funtion to collection when collection equals an array ', () => {
    // Arrange
    const collection: vm.HotelEntityVm[] = [];
    const mapFunction = () => {};

    // Act
    const result = mapToCollection(collection, mapFunction);

    // Assert
    const expectedResult = collection.map(mapFunction);

    expect(result).toEqual(expectedResult);
  });
});
