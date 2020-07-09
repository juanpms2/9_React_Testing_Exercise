import * as React from 'react';
import { HotelCard } from './hotel-card.component';
import { render, fireEvent } from '@testing-library/react';
import { HotelEntityVm } from '../hotel-collection.vm';
import { basePicturesUrl, linkRoutes } from 'core';
import { useHistory } from 'react-router-dom';

describe('Hotel Card component specs', () => {
  const props = {
    hotel: {
      address: 'test address',
      description: 'test description',
      id: 'test id',
      name: 'test name',
      picture: `${basePicturesUrl}/test_url`,
      rating: 1,
    } as HotelEntityVm,
  };

  it('Should display a card with hotel props when it feeds hotel props', () => {
    // Arrange

    // Act
    const { getByText, getByTestId } = render(<HotelCard {...props} />);
    const addressElement = getByText(props.hotel.address);
    const descriptionElement = getByText(props.hotel.description);
    const nameElement = getByText(props.hotel.name);
    const pictureElement = getByTestId('img-dataTestId');
    const ratingElement = getByText(props.hotel.rating.toString());

    // Assert
    expect(addressElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
    expect(nameElement).toBeInTheDocument();
    expect(ratingElement).toBeInTheDocument();
    expect(pictureElement).toHaveStyle(
      `background-image: url(${props.hotel.picture})`
    );
  });

  it('Should display moreButton and called toDo function when IconButton click', () => {
    // Arrange
    const toDo = jest.fn();

    // Act
    const { getByTestId } = render(<HotelCard {...props} />);
    const moreButton = getByTestId('more-button');
    moreButton.addEventListener('click', toDo);
    fireEvent.click(moreButton);

    // Assert
    expect(moreButton).toBeInTheDocument();
    expect(toDo).toHaveBeenCalled();
  });

  it('Should display Edit hotel button and called toDo function when button click ', () => {
    // Arrange
    const toDo = jest.fn().mockImplementation((id) => {
      linkRoutes.hotelEdit(id);
    });

    // Act
    const { getByLabelText } = render(<HotelCard {...props} />);
    const editButton = getByLabelText('Edit hotel');
    editButton.addEventListener('click', toDo(props.hotel.id));
    fireEvent.click(editButton);

    // Assert
    expect(editButton).toBeInTheDocument();
    expect(toDo).toHaveBeenCalled();
  });

  it('Should display Edit hotel button and called toDo function when button click ', () => {
    // Arrange
    const deleteHotel = jest.fn();

    // Act
    const { getByLabelText } = render(<HotelCard {...props} />);
    const editButton = getByLabelText('Delete');
    editButton.addEventListener('click', deleteHotel);
    fireEvent.click(editButton);

    // Assert
    expect(editButton).toBeInTheDocument();
    expect(deleteHotel).toHaveBeenCalled();
  });
});
