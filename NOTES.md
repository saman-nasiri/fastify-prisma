## dependencies
npm i @prisma/client fastify fastify-zod zod zod-to-json-schema fastify-jwt fastify-swagger

## devDependencies
npm i ts-node-dev typescript @types/node --dev
npm install --save-dev mocha chai @types/mocha @types/chai supertest @types/supertest

## Initialise prisma
npx prisma init --datasource-provider postgresql

### Migrate the schema
npx prisma migrate dev --name init

### Test Service
npx mocha ./src/__test__/*.test.ts

