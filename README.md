# React Testing Exercise witch Jest and Cypress

| Travis CI                                                                                                                                             | Circle CI                                                                                                                                                     |
| ----------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [![Build Status](https://travis-ci.com/juanpms2/9_React_Testing_Exercise.svg?branch=master)](https://travis-ci.com/juanpms2/9_React_Testing_Exercise) | [![CircleCI](https://circleci.com/gh/juanpms2/9_React_Testing_Exercise.svg?style=svg)](https://circleci.com/gh/juanpms2/9_React_Testing_Exercise/tree/master) |
|                                                                                                                                                       |                                                                                                                                                               |

## Instalación de librerías

En este proyecto de React instalaremos las siguientes librerías:

[React Testing Library](https://github.com/testing-library/react-testing-library)

`npm install @testing-library/react --save-dev`

[react-hooks-testing-library](https://github.com/testing-library/react-hooks-testing-library)

`npm install --save-dev @testing-library/react-hooks react-test-renderer`

[jest-dom library](https://github.com/testing-library/jest-dom)

`npm install --save-dev @testing-library/jest-dom`

[cypress io](https://github.com/cypress-io/cypress)

`npm install cypress -D`

---

### La integración continua se ha hecho en `Travis` para `Jest` (unit tests) y en `Circle CI` para `Cypress` (e2e) y `Jest`.

Tanto Jest como Cypress tienen su archivo README con la documentación y código utilizado.

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
