# Build stage
FROM node:18-alpine as build

WORKDIR /app

COPY frontend/package*.json ./
RUN npm install

COPY frontend .

# Modificar la URL del backend para producción
#RUN sed -i 's|http://localhost:5000|http://backend:5000|g' src/components/ChatbotComponent.js

RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80