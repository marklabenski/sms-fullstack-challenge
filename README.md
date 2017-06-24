# sms-fullstack-challenge
Fullstack challenge accepted!

## Prerequisitesa

### Development Prerequisites
- Docker including `docker-compose`
- nodeJS version `v8.1.2`
- yarn: `$ npm i -g yarn`

For testing:

- AVA: `$ npm i -g ava`

## Build

### Running the App
- simply go to the root directory of the project and type:
`$ docker-compose up`

After that there should be a webserver running on your machine on port `8080`

_Hint_: If you using MacOs or Windows running the docker toolbox you have to use the vm's IP instead of `localhost`
To find out which IP that is:
`$ docker-machine config | grep tcp`

## Development

### Client (VueJS) Development

- in order to start the client service locally via `yarn run dev`
you need to add the host `api` bind to the IP of your Docker machine
to your local `hosts`
