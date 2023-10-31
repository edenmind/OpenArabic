FROM node:latest

ENV NODE_ENV=production
ENV FASTIFY_PORT=3030
ENV FASTIFY_ADDRESS=0.0.0.0

WORKDIR /usr/src/app

# Install curl
RUN apt-get update && apt-get install -y curl && apt-get clean

# Copy only what's necessary
COPY ["package.json", "yarn.lock", "./"]

# Install dependencies in a separate layer
RUN yarn install --production && mv node_modules ../ && yarn global add fastify-cli@5.9.0 && yarn cache clean

# Copy only the source code
COPY . .

# Change ownership to the node user
RUN chown -R node /usr/src/app
USER node

EXPOSE 3030
CMD ["yarn", "start"]