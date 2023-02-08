# Dockerfile
FROM node:latest

RUN mkdir /server

WORKDIR /server

COPY package*.json ./
COPY tsconfig.json ./

RUN npm i

COPY src src

CMD npm start