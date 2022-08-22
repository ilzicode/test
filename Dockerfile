FROM node:alpine

ENV TZ="Asia/Jakarta"

WORKDIR /app

COPY package*.json ./

RUN npm install --silent

COPY . ./

EXPOSE 3000