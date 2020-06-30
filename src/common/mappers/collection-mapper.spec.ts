import { mapToCollection } from './collection.mapper';

describe('collection-mapper specs', () => {
  it('should return an empty array when collection is undefined', () => {
    // Arrange
    const collection: Array<any> = undefined;
    const mapFunction = () => {};

    // Act
    const result = mapToCollection(collection, mapFunction);
    // Assert
    expect(result).toEqual([]);
  });

  it('should return an empty array when collection is null', () => {
    // Arrange
    const collection: Array<any> = null;
    const mapFunction = () => {};

    // Act
    const result = mapToCollection(collection, mapFunction);
    // Assert
    expect(result).toEqual([]);
  });

  it('should return a map funtion to collection when collection equals an array', () => {
    // Arrange
    const collection: Array<any> = [];
    const mapFunction = () => {};

    // Act
    const result = mapToCollection(collection, mapFunction);

    // Assert
    const expectedResult = collection.map(mapFunction);

    expect(result).toEqual(expectedResult);
  });
});
