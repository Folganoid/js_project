FROM node:8.9-alpine as nodejs
WORKDIR /var/www2
COPY /src /var/www2
COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production --silent && mv node_modules ../

EXPOSE 3000
CMD ["npm", "start"]