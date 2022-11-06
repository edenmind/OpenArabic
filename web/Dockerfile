# build
FROM node:lts-alpine AS BUILD

ENV NODE_ENV=production

ARG REACT_APP_API_KEY
ARG REACT_APP_API_URL
ARG REACT_APP_GOOGLE_API_KEY

ENV NODE_ENV=production
ENV REACT_APP_API_URL=$REACT_APP_API_URL
ENV REACT_APP_GOOGLE_API_KEY=$REACT_APP_GOOGLE_API_KEY
ENV REACT_APP_KEY=$REACT_APP_KEY

WORKDIR /usr/src/app
COPY ["package.json", "yarn.lock", "./"]
RUN yarn install && mv node_modules ../
COPY . .

RUN --mount=type=secret,id=REACT_APP_API_URL\
    --mount=type=secret,id=REACT_APP_GOOGLE_API_KEY\
    --mount=type=secret,id=REACT_APP_KEY \
    export "REACT_APP_API_URL"=$(cat /run/secrets/REACT_APP_API_URL) && \
    export "REACT_APP_GOOGLE_API_KEY"=$(cat /run/secrets/REACT_APP_GOOGLE_API_KEY) && \
    export "REACT_APP_KEY"=$(cat /run/secrets/REACT_APP_KEY) && \
    ../node_modules/.bin/react-scripts build

# deploy
FROM nginx:stable-alpine

COPY --from=BUILD /usr/src/app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3040