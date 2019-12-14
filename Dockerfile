FROM node:10 as builder

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn clean
RUN yarn install
COPY . .
RUN yarn build

FROM node:10 as api
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app ./
CMD ["yarn", "start:prod"]
EXPOSE 8080
