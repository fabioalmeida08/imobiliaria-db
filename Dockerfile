FROM node:18

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn

COPY . .

RUN yarn build

ENV PORT=3001

EXPOSE 3001

CMD yarn dev