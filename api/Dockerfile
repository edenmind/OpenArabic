#docker pull node:lts-alpine
FROM node:lts-alpine

ENV NODE_ENV=production
ENV FASTIFY_PORT=3030
ENV FASTIFY_ADDRESS=0.0.0.0

WORKDIR /usr/src/app
COPY ["package.json", "yarn.lock", "./"]
RUN yarn install --production && mv node_modules ../ && yarn global add fastify-cli && yarn cache clean
COPY . .
RUN chown -R node /usr/src/app
USER node

EXPOSE 3030
CMD ["yarn", "start"]