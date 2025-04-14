# Imagen base oficial de Node.js
FROM node:20.11.0

# Establecer directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del proyecto
COPY . .

# Exponer el puerto en el que corre tu app (ajústalo si es diferente)
EXPOSE 8000

# Comando para iniciar la app
CMD ["npm", "start"]
