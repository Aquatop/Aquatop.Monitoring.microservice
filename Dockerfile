FROM node:10

WORKDIR /usr/app
COPY package.json yarn.lock ./

RUN yarn

COPY . .

EXPOSE 3001
CMD ["yarn", "dev"]
