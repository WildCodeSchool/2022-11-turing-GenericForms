# Dockerfile
FROM node:latest

RUN mkdir /app

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm i

COPY src src
COPY fixtures fixtures

CMD npm start