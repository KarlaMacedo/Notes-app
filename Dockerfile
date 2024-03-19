# Usa una imagen base de Node.js
FROM node:14

# Establece el directorio de trabajo en la carpeta de la aplicación
WORKDIR /usr/src/app

# Copia el archivo package.json y package-lock.json (si existe)
COPY package*.json ./

# Instala las dependencias de la aplicación
RUN npm install

# Copia el resto de los archivos de la aplicación
COPY . .

# Expone el puerto en el que se ejecutará la aplicación
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]
