FROM node:alpine

ENV TZ="Asia/Jakarta"

WORKDIR /app

COPY package*.json ./

RUN npm install --silent

COPY . ./


# CMD ["cd routes","node", "sendmail.js"]


EXPOSE 3000