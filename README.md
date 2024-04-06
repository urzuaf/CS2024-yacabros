CS2024-yacabros
# Sportify
## Gestión de torneos deportivos

### Indicaciones backend

Para aquellos que trabajen con el backend deben crear una base de datos en postgreSQL llamada "sportify". Dentro de esa base de datos deben correr las instrucciones del archivo Script.sql para crear la base de datos y agregar información de prueba.

Para conectarse a la base de datos deben crear dentro de la carpeta "BACKEND" un archivo llamado "credentials.js", dentro de ese archivo deben copiar el siguiente codigo:

```
//en un ambiente de producción esto se debería hacer con variables de entorno no con js

const data = {
    user:"tu_usuario",
    host:"localhost",
    database:"sportify",
    password:"tu_contraseña",
    port:5432
}

export default data

```
Con esto la conexión a la base de datos debería ser exitosa.
