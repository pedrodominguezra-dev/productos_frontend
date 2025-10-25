## Construir la aplicación React
#Install node
FROM node:22-alpine AS build-stage

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia solo los archivos de dependencias primero (mejor caching)
COPY package.json ./
COPY package-lock.json ./

# Instala dependencias
RUN npm ci

# Copia el resto del código
COPY . .

# Construye la app de React para producción
RUN npm run build

# Desarrollo de configuración de Nginx
FROM nginx:alpine

# Elimina la configuración por defecto de Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copia tu configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/

# Copia los archivos generados de React al directorio público de Nginx
COPY --from=build-stage /app/build /usr/share/nginx/html

# Expone el puerto 80
EXPOSE 80

# Inicia Nginx
CMD ["nginx", "-g", "daemon off;"]
