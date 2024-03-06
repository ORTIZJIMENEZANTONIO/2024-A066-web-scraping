# Usa una imagen más pequeña como base
FROM node:18.0.0-alpine

# Establece el directorio de trabajo
WORKDIR /app

# Configura la variable de entorno PORT
ENV PORT 3001

# Instala las dependencias de construcción y Python
RUN apk --no-cache add --virtual builds-deps build-base python3

# Copia solo los archivos necesarios para instalar las dependencias
COPY package.json yarn.lock /app/

# Instala las dependencias
RUN yarn install --production=true

# Copia el resto de los archivos
COPY . /app

# Expone el puerto
EXPOSE 3001

# Comando de inicio
CMD ["yarn", "start"]
