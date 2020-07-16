import * as React from 'react';
import { render } from '@testing-library/react';
import { HotelCollectionContainer } from './hotel-collection.container';
import * as hook from './hotel-collection.hook';
import { HotelEntityVm } from './hotel-collection.vm';
import * as api from './hotel-collection.api';
import Axios from 'axios';

function getDefaultAdapter() {
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    Axios.defaults.adapter = require('axios/lib/adapters/xhr');
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    Axios.defaults.adapter = require('axios/lib/adapters/http');
  }
}

describe('hotel-collection.container specs', () => {
  it('Should called hook when it mounts component', () => {
    // Arrange
    const useHotelCollectionStub = jest.spyOn(hook, 'useHotelCollection');

    // Act
    const {} = render(<HotelCollectionContainer />);

    // Assert
    expect(useHotelCollectionStub).toHaveBeenCalled();
  });

  it('Should display component when container render', () => {
    // Arrange

    // Act
    const { getByTestId } = render(<HotelCollectionContainer />);
    const element = getByTestId('div-hotel-container');

    // Assert

    expect(element).toBeInTheDocument();
  });

  describe('called loadHotelCollection', () => {
    getDefaultAdapter();

    it('Should called loadHotelCollection when useEffect is called', () => {
      // Arrange

      const hotelCollection = [];
      const axiosStub = jest.spyOn(Axios, 'get');
      const getHotelCollectionStub = jest.spyOn(api, 'getHotelCollection');
      const loadHotelCollection = jest.fn().mockReturnValue(hotelCollection);
      const useEffectStub = jest
        .spyOn(React, 'useEffect')
        .mockReturnValue(loadHotelCollection());

      // Act
      const {} = render(<HotelCollectionContainer />);

      // Assert

      expect(loadHotelCollection).toHaveBeenCalled();
    });
  });
});
