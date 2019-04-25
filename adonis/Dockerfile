FROM node:8.9-alpine as adonis

WORKDIR . /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3333
CMD [ "npm", "start" ]