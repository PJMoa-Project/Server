FROM node:16-alpine

WORKDIR /app

COPY package.json /app

RUN yarn --frozen-lockfile

COPY . /app

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start:prod"]
