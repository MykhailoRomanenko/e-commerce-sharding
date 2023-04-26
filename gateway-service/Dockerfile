FROM node:16.14-alpine

WORKDIR /var/www/app

COPY tsconfig.json .
COPY package.json yarn.lock ./
RUN yarn

COPY src .
RUN yarn build
CMD yarn start
