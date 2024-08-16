# Stage 1: Build the Angular app
FROM node:16 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build -- --output-path=dist/Location

# Stage 2: Serve the app with a web server
FROM nginx:alpine
COPY --from=build /app/dist/Location /usr/share/nginx/html


