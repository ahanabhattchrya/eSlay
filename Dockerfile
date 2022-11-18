# https://blog.miguelgrinberg.com/post/how-to-dockerize-a-react-flask-project

# Build step #1: build the React.js front end
FROM node:16-alpine as build-step
WORKDIR /frontend
ENV PATH /node_modules/.bin:$PATH
COPY package.json yarn.lock ./
COPY ./src ./src
COPY ./public ./public
RUN yarn install
RUN yarn build


# Build step #2: build the python Flask backend
FROM ubuntu:18.04

RUN apt-get update && apt-get install -y python3 python3-pip

ENV HOME /root
WORKDIR /root

COPY . .
RUN pip3 install --no-cache-dir -r requirements.txt

EXPOSE 8000

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

CMD /wait && python3 -u server.py