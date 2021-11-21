FROM node:lts-alpine AS build
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
RUN npm install expo-cli -g
COPY . .
RUN expo build:web

FROM nginx:latest
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/web-build /usr/share/nginx/html/

EXPOSE 5000