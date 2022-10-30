# build
FROM node:lts-alpine AS BUILD

ENV NODE_ENV=production
ENV REACT_APP_API_URL=https://backend.openarabic.io

WORKDIR /usr/src/app
COPY ["package.json", "yarn.lock", "./"]
RUN yarn install --production && mv node_modules ../
COPY . .
RUN ../node_modules/.bin/react-scripts build

# deploy
FROM nginx:stable-alpine

COPY --from=BUILD /usr/src/app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3040