# https://blog.miguelgrinberg.com/post/how-to-dockerize-a-react-flask-project


# IMPORTANT!!! IMPORTANT!!!! IMPORTANT!!!!
#
# DO NOT USE THE LINK GIVEN FROM FLASK, IT DOES NOT WORK.
#
# USE localhost:3030 INSTEAD!!!!

# Build step #1: build the React.js front end
FROM node:16-alpine as build-step
WORKDIR /frontend
ENV PATH /frontend/node_modules/.bin:$PATH
COPY frontend/package.json frontend/yarn.lock ./
COPY frontend/src ./src
COPY frontend/public ./public
RUN yarn install
RUN yarn build


# Build step #2: build the python Flask backend
FROM python:3.9

WORKDIR /frontend
COPY --from=build-step /frontend/build ./build

RUN mkdir ./backend
COPY backend/requirements.txt ./backend
COPY backend/__init__.py ./backend

WORKDIR /frontend/backend

RUN mkdir ./app
RUN mkdir ./database

COPY backend/app/ ./app
COPY backend/database/ ./database

WORKDIR /frontend

RUN pip install -r ./backend/requirements.txt

EXPOSE 3000

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait

WORKDIR /frontend/backend/app
CMD /wait && python -u app.py
