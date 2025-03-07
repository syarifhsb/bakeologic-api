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

```bash
$ cp .env.example .env
```

Setup the database:

```bash
$ bun docker:up
```

Install dependencies:

```bash
$ bun install
```

Migrate the database:

```bash
$ bun db:migrate
```

Generate the Prisma Client:

```bash
$ bun db:gen
```

Seed the database:

```bash
$ bun db:seed
```

Run development server:

```bash
$ bun dev
```

Open [http://localhost:3000](http://localhost:3000)
