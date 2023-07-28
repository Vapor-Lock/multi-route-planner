FROM node:18.13.0

WORKDIR /opt/app
COPY package.json yarn.lock ./
RUN yarn install
COPY . ./
CMD ["node", "app.mjs"]