FROM node:14-alpine

RUN apk update && apk add bash
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8082


CMD ["./wait.sh", "rabbitmq:5672", "--",  "node", "server.js" ]