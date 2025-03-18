
# API de Mock de Usuarios y Mascotas

Esta API permite generar usuarios y mascotas mockeados y almacenarlos en una base de datos MongoDB. La API está diseñada para pruebas y desarrollo.

## Requisitos

- Node.js
- MongoDB Atlas
- Instalar dependencias de Node.js

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/JonatanGuinea/backend-III-coderhouse.git
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Crea un archivo `.env` en la raíz del proyecto y agrega las siguientes variables de entorno:

   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/tu_base_de_datos
   ```

   - `PORT`: Puerto en el que se ejecutará el servidor.
   - `MONGODB_URI`: URL de conexión a tu base de datos MongoDB.

4. Inicia el servidor:

   ```bash
   npm start
   ```

   El servidor se ejecutará en el puerto definido (por defecto `http://localhost:8080`).

## Endpoints

### `GET /`

Este es el endpoint de prueba. Simplemente devuelve un mensaje.

#### Respuesta

```json
{
  "error": null,
  "saludo": {
    "message": "Welcome to the Mock API"
  }
}
```

### `GET /api/mocks/mockingusers`

Genera **50 usuarios mockeados** y los devuelve en formato JSON.

#### Respuesta

```json
{
  "status": "success",
  "users": [
    {
      "firstName": "John",
      "lastName": "Doe",
      "email": "john.doe@example.com",
      "password": "hashed_password",
      "role": "user",
      "pets": []
    },
    ...
  ]
}
```

### `POST /api/mocks/generateData`

Genera e inserta **usuarios y mascotas mockeados** en la base de datos. Se requiere un cuerpo con los parámetros `users` y `pets`.

#### Cuerpo de la solicitud

```json
{
  "users": 50,
  "pets": 30
}
```

- `users`: Cantidad de usuarios a generar.
- `pets`: Cantidad de mascotas a generar.

#### Respuesta

```json
{
  "status": "success",
  "message": "Usuarios y mascotas generados e insertados correctamente."
}
```

### `GET /api/mocks/mockingpets`

Genera **10 mascotas mockeadas** y las devuelve en formato JSON.

#### Respuesta

```json
{
  "status": "success",
  "pets": [
    {
      "name": "Fido",
      "breed": "Labrador",
      "age": 5
    },
    ...
  ]
}
```

## Errores

Si algo sale mal, la API devolverá una respuesta con el siguiente formato:

```json
{
  "status": "error",
  "message": "Descripción del error"
}
```

## Tecnologías Usadas

- **Node.js**: JavaScript del lado del servidor.
- **Express**: Framework de Node.js para crear aplicaciones web.
- **MongoDB**: Base de datos NoSQL utilizada para almacenar los usuarios y mascotas generados.
- **Faker.js**: Librería para generar datos falsos (usuarios, mascotas, etc).
- **bcrypt**: Librería para hashear contraseñas.


