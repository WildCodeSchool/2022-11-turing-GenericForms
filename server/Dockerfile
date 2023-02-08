# Dockerfile
FROM node:latest

RUN mkdir /app

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm i

COPY src src

CMD npm start