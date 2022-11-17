# https://blog.miguelgrinberg.com/post/how-to-dockerize-a-react-flask-project

# Build step #1: build the React front end
FROM node:16-alpine as build-step
WORKDIR /frontend
ENV PATH /node_modules/.bin:$PATH
COPY package.json yarn.lock ./
COPY ./src ./src
COPY ./public ./public
RUN yarn install
RUN yarn build