FROM node:18-alpine

RUN apk update && apk add tzdata
ENV TZ="America/Sao_Paulo"

RUN apk add --no-cache git openssh

RUN mkdir -p /usr/src/app
ENV PORT 3000

WORKDIR /usr/src/app


COPY package.json /usr/src/app
COPY yarn.lock /usr/src/app

# Production use node instead of root
# USER node

RUN yarn


ENV NODE_ENV production

COPY . /usr/src/app
#COPY .env.producao /usr/src/app/.env
RUN yarn build

CMD [ "yarn", "start" ]