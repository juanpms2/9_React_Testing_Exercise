# Cypress tests e2e | [![CircleCI](https://circleci.com/gh/juanpms2/9_React_Testing_Exercise.svg?style=svg)](https://circleci.com/gh/juanpms2/9_React_Testing_Exercise/tree/master)

_Para la integración continua es necesario subir al repositorio `package-lock.json`_

#### Instalación de Cypress

`npm install cypress -D`

#### Verificamos y arrancamos Cypress

El siguiente comando nos verifica si Cypress puede correr y abre lo abre creando una carpeta en el raiz y nos abre una estancia de cypress en el navegador.

`node_modules/.bin/cypress open`

#### Creamos los script en el `package.json` parar Cypress

```json

"scripts": {
  ...
    "test:e2e": "npm-run-all -p -l start:dev start:e2e",
    "start:e2e": "cypress open",
    "test:e2e:ci": "npm-run-all -p -l -r start:dev run:e2e",
    "run:e2e": "cypress run"
  ...
}

```

#### Agregamos la siguiente línea de código al inicio de nuestros ficheros spec para tener intelligence en el editor.

```html
/// <reference types="Cypress" />
```

#### Cypress también nos crea el archivo `cypress.json` donde podemos añadir configuración de Cypress. Por ejemplo:

```json
{
  "baseUrl": "http://localhost:8080"
}
```

Al arrancar Cypress por primera vez nos pide una serie de pasos y seguido nos crea en el raíz una carpeta con su mismo nombre. Dentro de ella tenemos otra llamada `integration` donde crearemos nuestros tests, otra llamada `fixtures` donde crearemos los mocks de datos y llamada `support` donde crearemos nuestros comandos personalizados.

Para la integración continua se ha utilizado CircleCI que debemos conectar con nuestro repositorio de GitHub. En el directorio raíz crearemos la carpeta `.circleci` y dentro el archivo de configuración `config.yml`.

`config.yml`

```yml
version: 2
jobs:
  build:
    working_directory: ~/test-ci-code
    docker:
      - image: circleci/node:12
    steps:
      - checkout
      - run:
          name: install cypress dependencies
          command: 'sudo apt-get install xvfb libgtk-3-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2'
      - run:
          name: install
          command: 'npm install'
      - run:
          name: test:e2e
          command: 'npm run test:e2e:ci'
      - run:
          name: test
          command: 'npm run test'
```

## Tests

`1-login-input.spec.js`

```typescript
/// <reference types="Cypress" />

describe('Login input', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('visits the login page and login', () => {
    const typedText = 'admin';
    const typedPassword = 'test';

    cy.get("[type='text']").should('have.focus');

    cy.get(
      '[data-testid=test-input-name] > .MuiInputBase-root > .MuiInputBase-input'
    )
      .type(typedText)
      .should('have.value', typedText);

    cy.get(
      '[data-testid=test-input-password] > .MuiInputBase-root > .MuiInputBase-input'
    )
      .type(typedPassword)
      .should('have.value', typedPassword);

    cy.get('.MuiButtonBase-root').click().loadAndVisitHotelCollection();
  });
});
```

`2-hotel-viewer-init.spec.js`

```typescript
/// <reference types="Cypress" />

describe('Hotel viewer init', () => {
  it('displays hotels on page load', () => {
    cy.loadAndVisitHotelCollection();
    cy.get('[data-testid="div-hotel-container"] > div').should(
      'have.length',
      2
    );
  });
  it('should navigate to hotel-edit', () => {
    cy.get(
      ':nth-child(1) > .MuiCardActions-root > [data-testid=test-button-editHotel]'
    ).click();
  });
});
```
