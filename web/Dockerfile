# build
FROM node:lts-alpine AS BUILD

ENV NODE_ENV=production

RUN echo "REACT_APP_API_URL: $REACT_APP_API_URL" && \
    echo "REACT_APP_GOOGLE_API_KEY: $REACT_APP_GOOGLE_API_KEY" && \
    echo "REACT_APP_KEY: $REACT_APP_KEY"

WORKDIR /usr/src/app
COPY ["package.json", "yarn.lock", "./"]
RUN yarn install && mv node_modules ../
COPY . .
RUN ../node_modules/.bin/react-scripts build

# deploy
FROM nginx:stable-alpine

COPY --from=BUILD /usr/src/app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3040