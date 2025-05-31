import { OpenAPIHono } from "@hono/zod-openapi";
import { Scalar } from "@scalar/hono-api-reference";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { ENV } from "./env";
import { authRoute } from "./routes/auth";
import { cartRoute } from "./routes/cart";
import { categoriesRoute } from "./routes/categories";
import { productsRoute } from "./routes/products";
import { usersRoute } from "./routes/users";

const app = new OpenAPIHono();

app.use(logger());
app.use(cors());

app
  .route("/products", productsRoute)
  .route("/categories", categoriesRoute)
  .route("/users", usersRoute)
  .route("/auth", authRoute)
  .route("/cart", cartRoute);

const openAPIConfig = {
  openapi: "3.1.1",
  info: { title: "Bakeologic API", version: "1.0.0" },
};

const openAPIReference = app.getOpenAPIDocument(openAPIConfig);
console.log(openAPIReference);

app
  .doc("/openapi.json", openAPIConfig)
  .openAPIRegistry.registerComponent("securitySchemes", "Bearer", {
    type: "http",
    scheme: "bearer",
    in: "header",
    // Authorization: Bearer <token>
  });

app.get(
  "/",
  Scalar({
    url: "/openapi.json",
    pageTitle: "Bakeologic API Reference",
    theme: "deepSpace",
  })
);

console.info(`Server is running on port :${ENV.PORT}`);

export default app;
