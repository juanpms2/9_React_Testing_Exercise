# React Testing Exercise witch Jest and Cypress

[![Build Status](https://travis-ci.com/juanpms2/9_React_Testing_Exercise.svg?branch=master)](https://travis-ci.com/juanpms2/9_React_Testing_Exercise)

## Instalación de librerías

En este proyecto de React instalaremos las siguientes librerías:

[React Testing Library](https://github.com/testing-library/react-testing-library)

`npm install @testing-library/react --save-dev`

[jest-dom library](https://github.com/testing-library/jest-dom)

`npm install --save-dev @testing-library/jest-dom`

[react-hooks-testing-library](https://github.com/testing-library/react-hooks-testing-library)

`npm install --save-dev @testing-library/react-hooks react-test-renderer`

---

## Configuración Jest para typescript

Intalamos jest, los @types y las librería para typescript:

`npm install jest @types/jest ts-jest --save-dev`

La configuración Jest para typescript podemos agregarla directamente en el package.json con:

```json
"jest": {
    "preset": "ts-jest",
    "restoreMocks": true
}
```

Nosotros crearemos la configuración de Jest fuera del package.json. Para ello en el raiz creamos la carpeta `config\test` y el archivo de configuración `jest.json`

```json
{
  "rootDir": "../../",
  "preset": "ts-jest",
  "restoreMocks": true,
  "setupFilesAfterEnv": ["<rootDir>/config/test/setup-after.ts"],
  "moduleDirectories": ["<rootDir>/src", "node_modules"]
}
```

## Importante

**Cuando se configure el fichero jest.json, añadir la configuración de los alias usando:**

```json
{
"rootDir": "../../",
...
"moduleDirectories": ["<rootDir>/src", "node_modules"],
}
```

Creamos el fichero `setup-after.ts` donde cargaremos las librerías necesarias del proyecto

```typescript
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
```

Creamos los comandos para ejecutar los test en el package.json

```json
"test": "jest --verbose -c ./config/test/jest.json",
"test:watch": "npm test -- --watchAll -i --no-cache"
```

---

## Configuración de `debug` en `VSCode`

Creamos el archivo de configuración para hacer debug en VSCode. En nuestro caso crearemos un sigle test, otro con --wathAll y otro para ejecutar un archivo específico de test:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Jest single run",
      "program": "${workspaceRoot}/node_modules/jest/bin/jest.js",
      "args": [
        "-c",
        "./config/test/jest.json",
        "--verbose",
        "-i",
        "--no-cache"
      ],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    },
    {
      "type": "node",
      "request": "launch",
      "name": "Jest watch run",
      "program": "${workspaceRoot}/node_modules/jest/bin/jest.js",
      "args": [
        "-c",
        "./config/test/jest.json",
        "--verbose",
        "-i",
        "--no-cache",
        "--watchAll"
      ],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    },
    {
      "type": "node",
      "request": "launch",
      "name": "Jest selected file",
      "program": "${workspaceRoot}/node_modules/jest/bin/jest.js",
      "args": [
        "${fileBasenameNoExtension}",
        "-c",
        "./config/test/jest.json",
        "--verbose",
        "-i",
        "--no-cache",
        "--watchAll"
      ],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    }
  ]
}
```

---

## Tests de mappers

`common/mappers/collection.mapper.spec.ts`

```typescript
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
```

`pods/hotel-collection/hotel-collection.mapper.spec.ts`

```typescript
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
```

---

## Tests de componentes

`common/components/form/text-field.spec.tsx`

```typescript
import * as React from 'react';
import { TextField } from './text-field';
import { render } from '@testing-library/react';
import { FieldRenderProps } from 'react-final-form';
import { TextFieldProps } from '@material-ui/core';

describe('TextField component specs', () => {
  it('should display a input text and get these props', () => {
    // Arrange
    const onchange = jest.fn();

    const restInput = {
      'data-testid': 'testId',
    } as TextFieldProps;

    const rest = {
      inputProps: {},
      helperText: 'test helperText',
    } as TextFieldProps;

    const props = {
      input: {
        name: 'testName',
        value: 'test value',
        onChange: onchange(),
        ...restInput,
      },
      meta: {
        submitError: 'test submitError',
        dirtySinceLastSubmit: false,
        error: 'test error',
        touched: false,
      },
      ...rest,
    } as FieldRenderProps<any, any>;

    // Act
    const { getByTestId } = render(<TextField {...props} />);
    const inputText = getByTestId('testId') as HTMLInputElement;

    // Assert
    expect(inputText).toBeInTheDocument();
    expect(inputText.name).toEqual('testName');
  });

  it('should return onchange have been called', () => {
    // Arrange
    const onchange = jest.fn();
    const props = {
      input: {
        onChange: onchange(),
      },
    } as FieldRenderProps<any, any>;

    // Act

    // Assert
    expect(onchange).toHaveBeenCalled();
  });

  it('should display error when showError equals true', () => {
    // Arrange
    const props = {
      meta: {
        submitError: 'test submitError',
        dirtySinceLastSubmit: true,
        error: 'test error',
        touched: true,
      },
    } as FieldRenderProps<any, any>;

    // Act
    const showError =
      ((props.meta.submitError && props.meta.dirtySinceLastSubmit) ||
        props.meta.error) &&
      props.meta.touched;

    // Assert
    expect(showError).toBeTruthy();
  });
});
```

---

## Test de hooks

Para el it: `"should call mapToCollection when loadHotelCollection is called"`, se ha tenido que actualizar Node y Jest a su última versión y typescript a una versión inferior a la 3.9, en este caso la 3.8 para poder utilizar el stub.

[https://github.com/facebook/jest/pull/10156](https://github.com/facebook/jest/pull/10156)

`pods/hotel-collection/hotel-collection.hook.spec.ts`

```typescript
import { renderHook, act } from '@testing-library/react-hooks';
import { useHotelCollection } from './hotel-collection.hook';
import * as api from './hotel-collection.api';
import { mapFromApiToVm } from './hotel-collection.mapper';
import * as mapFunction from 'common/mappers';
import Axios from 'axios';

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
```

---

## Test components and containers (/pods)

`hotel-collection.container.spec.tsx`

```typescript
import * as React from 'react';
import { render } from '@testing-library/react';
import { HotelCollectionContainer } from './hotel-collection.container';
import * as hook from './hotel-collection.hook';
import { HotelEntityVm } from './hotel-collection.vm';
import * as api from './hotel-collection.api';
import Axios from 'axios';

jest.mock('./hotel-collection.hook', () => {
  return {
    useHotelCollection: jest.fn().mockReturnValue({
      hotelCollection: [],
      loadHotelCollection: jest.fn(),
    }),
  };
});

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

  it('Should called loadHotelCollection when useEffect is called', () => {
    // Arrange
    const hotelCollection: HotelEntityVm[] = [];
    const getStub = jest
      .spyOn(Axios, 'get')
      .mockResolvedValue({ data: hotelCollection });

    const loadHotelCollection = jest.fn().mockReturnValue(hotelCollection);

    const useEffect = jest
      .spyOn(React, 'useEffect')
      .mockReturnValue(loadHotelCollection());

    // Act
    const {} = render(<HotelCollectionContainer />);
    // Assert

    expect(loadHotelCollection).toHaveBeenCalled();
  });
});
```

`hotel-collection.component.spec.tsx`

```typescript
import * as React from 'react';
import { render } from '@testing-library/react';
import { HotelCollectionComponent } from './hotel-collection.component';
import { HotelEntityVm } from './hotel-collection.vm';

describe('HotelCollection Component specs', () => {
  it('Should display a div container', () => {
    // Arrange
    const hotelCollection: HotelEntityVm[] = [];

    // Act
    const { getByTestId } = render(
      <HotelCollectionComponent hotelCollection={hotelCollection} />
    );
    const element = getByTestId('div-hotel-container');

    // Assert
    expect(element).toBeInTheDocument();
  });
  it('Should display a card with each hotel', () => {
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
```

`hotel-card.component.spec.tsx`

```typescript
import * as React from 'react';
import { HotelCard } from './hotel-card.component';
import { render, fireEvent } from '@testing-library/react';
import { HotelEntityVm } from '../hotel-collection.vm';
import { basePicturesUrl, linkRoutes } from 'core';

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
```

---
