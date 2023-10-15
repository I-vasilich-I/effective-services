# Effective-Services

## API Docs

[Postman](https://www.postman.com/joint-operations-administrator-8259820/workspace/effective-services)

## How to run the project

Clone repository

```bash
git clone https://github.com/I-vasilich-I/effective-services.git
```

Go to `effective-services` folder

```bash
cd ./effective-services
```

### User-Service [US]

Go to `user-service` folder

```bash
cd ./user-service
```

#### [US] Installation

```bash
npm install
```

Change file name and adjust variables if needed

```string
.env.example -> .env
```

#### [US] Running server

- run containers(requires [Docker](https://www.docker.com/))

  ```bash
  npm run docker
  ```

- open another terminal window and run prisma migration

  ```bash
  npm run prisma:migrate
  ```

#### [US] Direct database manipulations

- start and open prisma studio on <http://localhost:5555>

  ```bash
  npm run prisma:studio
  ```

#### [US] Unit tests

- run all tests

  ```bash
  npm run test
  ```

- run all tests in watch mode

  ```bash
  npm run test:watch
  ```

- run tests coverage

  ```bash
  npm run test:cov
  ```
