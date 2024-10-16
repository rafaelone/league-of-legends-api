# League of Legends API

Project focused on studies with the idea of ​​recreating the entire backend of the league of legends client.

### 🚀 Technologies

This project was developed with these technologies

- [Node](https://nodejs.org)
- [Fastify](https://fastify.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma](https://www.prisma.io/)
- [Redis](https://redis.io/)
- [Docker](https://www.docker.com/)

## Features

### Authentication

- ✅ It should be able to authenticate using e-mail & password;
- ❌ It should be able to authentica using Github account;
- ❌ It should be able to recover password using e-mail;
- ✅ It should be able to create an account (e-mail, name username, and password);

### Store

- ✅ It should be able to get all champions that user not have
- ❌ It should be able to get all champion skins that user not have
- ❌ It should be able to purchase a new champion;
- ❌ It should be purshace riot points with credit card, pix or bank slip;

## Getting Started

### Clone the repository

```sh
git clone https://github.com/rafaelone/league-of-legends-api

cd league-of-legends-api
```

### Envs

fill in the envelopes

### Install dependencies

```sh
npm i or yarn
```

### Run Scripts

```sh
- docker compose up -d
- yarn db:migrate or npm run db:migrate
- yarn upload-champions-thumbnail or npm run upload-champions-thumbnail
- yarn create-champions or npm run create-champions
- yarn dev or npm run dev

```
