FROM node:14-alpine

RUN apk update && apk add bash
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8082


CMD ["node", "index.js" ]