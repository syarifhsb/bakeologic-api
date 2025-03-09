# Chez Syarif Backend

## REST API Specification

- Production: `https://chez-syarif-api.syarifhasibuan.com/`
- Local: `http://localhost:3000/`

Products:

| Method | Path     | Description           | Status         |
| ------ | -------- | --------------------- | -------------- |
| GET    | `/`      | Get all products      | 200: `[]`      |
| GET    | `/:slug` | Get a product by slug | 200: `{}`, 404 |

Categories:

| Method | Path     | Description            | Status         |
| ------ | -------- | ---------------------- | -------------- |
| GET    | `/`      | Get all categories     | 200: `[]`      |
| GET    | `/:slug` | Get a category by slug | 200: `{}`, 404 |

## Getting Started

### Prerequisites

- [bun](https://bun.sh/)
- [Docker](https://docs.docker.com/get-docker/)

### Usage

Copy `.env.example` to `.env` and fill in the values:

```sh
cp .env.example .env
```

Setup the database:

```sh
bun docker:up
```

Install dependencies:

```sh
bun install
```

Migrate the database:

```sh
bun db:migrate
```

Generate the Prisma Client:

```sh
bun db:gen
```

Seed the database:

```sh
bun db:seed
```

Run development server:

```sh
bun dev
```

Open [http://localhost:3000](http://localhost:3000)
