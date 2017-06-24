# sms-fullstack-challenge
Fullstack challenge accepted!

## Prerequisitesa

### Build Prerequisites
- Docker including `docker-compose`

### Development Prerequisites
- Docker including `docker-compose`
- nodeJS version `v8.1.2`
- yarn: `$ npm i -g yarn`

For testing:

- AVA: `$ npm i -g ava`

## Build

### 1. Setting the IP for local execution
If you using MacOs or Windows running the docker toolbox you have to use the vm's IP
To find out which IP that is:
`$ docker-machine ip`

- in this case, add a hosts entry in your hosts table (`/private/etc/hosts` on mac os):

`<YOUR DOCKER-MACHINE IP> api`

### 2. Running the App
- simply go to the root directory of the project and type:
`$ docker-compose up` <-- this could take several minutes!


After the first log massages form the containers appear there should be a webserver running on your machine on port `8080`
Again, if you are using the docker-machine it would be something like `http://192.168.99.100:8080`

## Development

### Client (VueJS) Development

- in order to start the client service locally via `yarn run dev`
you need to add the host `api` bind to the IP of your Docker machine
to your local `hosts`

## Known Issues

### Frontend: I get a "Network Error" instead of the city contracts in the table below. What is wrong?

- Make sure that all docker containers are running. If you open `docker ps` there should be 3 containers running. `mongo`, `smsfullstackchallenge_client` and `smsfullstackchallenge_api`

### The is an error starting the mongodb after `docker-compose up`

- Try to remove all docker images build vie docker-compose

### I get warnings saying `MongoError: E11000 duplicate key error collection: haoc.citycontracts`

- This is because of the fixtures that are loaded again. You can set `LOAD_FIXTURES=false` in `./api/.env` or just ignore the warnings
