FROM node:lts-alpine

ENV NODE_ENV=production
ENV PORT=3010

WORKDIR /static
COPY open-source-dev-images .
RUN yarn global add serve@13.0.2 && chown -R node /static

USER node

CMD ["serve", "/static", "--cors"]