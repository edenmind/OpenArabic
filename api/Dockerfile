FROM node:lts-alpine
ENV NODE_ENV=production
ENV FASTIFY_PORT=3000
ENV FASTIFY_ADDRESS=0.0.0.0
WORKDIR /usr/src/app
COPY ["package.json", "yarn.lock", "./"]
RUN yarn install --production && mv node_modules ../ && yarn global add fastify-cli@3.1.0 && yarn cache clean
COPY . .
EXPOSE 3000
RUN chown -R node /usr/src/app
USER node
CMD ["yarn", "start"]
