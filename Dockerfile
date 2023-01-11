FROM node:16-alpine

WORKDIR /usr/app
COPY ./ /usr/app

RUN npm install

EXPOSE 3000

CMD ["node", "--expose-gc", "app.js"]
