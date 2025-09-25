
## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod

#commande pour faire une migration
npx prisma migrate dev --name

#Commande pour generer un JWT_SECRETx§§§
$ node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment
