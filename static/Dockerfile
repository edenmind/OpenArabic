#docker pull node:lts-alpine
FROM node:lts-alpine 

ENV NODE_ENV=production
ENV PORT=3010

WORKDIR /app
COPY open-source-dev-images ./static
RUN yarn global add serve@13.0.2 && chown -R node /app

USER node

CMD ["serve", "/app/static", "--cors"]