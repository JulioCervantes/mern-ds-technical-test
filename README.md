# Instalación

Configurar las variables de entorno en el archivo .env

```
MONGODB_URI=mongodb://localhost:27017/test
SOCKET_SERVER_URL=http://localhost:5000
JWT_SECRET=secret
```

Instalar dependencias

```
npm install
```

Iniciar aplicación
```
npm start
```


# Crear usuario administrador
Se puede crear un usuario administrador
utilizando el script create-super-admin-user.js
```
cd scripts
node create-super-admin-user -u demo -p demo -email demo@demo.com
```
