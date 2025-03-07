import { apiReference } from "@scalar/hono-api-reference";
import { OpenAPIHono } from "@hono/zod-openapi";
import { productsRoute } from "../routes/products";
import { categoriesRoute } from "../routes/categories";

const app = new OpenAPIHono();

app
  .basePath("/")
  .route("/products", productsRoute)
  .route("/categories", categoriesRoute)
  .doc("/openapi.json", {
    openapi: "3.1.1",
    info: { title: "Chez Syarif API", version: "1.0.0" },
  })
  .get("/", apiReference({ spec: { url: "/openapi.json" } }));

export default app;
