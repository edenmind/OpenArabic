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
FROM node:lts-alpine

ENV PORT=3040

COPY --from=BUILD /usr/src/app/build /app
RUN yarn global add serve@13.0.2 && chown -R node /app

USER node
EXPOSE 3040

CMD ["serve", "/app", "--cors"]