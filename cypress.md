#### Instalación de Cypress

`npm install cypress -D`

#### Verificamos y arrancamos Cypress

El siguiente comando nos verifica si Cypress puede correr y abre lo abre creando una carpeta en el raiz y nos abre una estancia de cypress en el navegador.

`node_modules/.bin/cypress open`

#### Creamos el script en el `package.json` parar arrancar Cypress

```json

"scripts": {

    "cypress": "cypress open",

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
