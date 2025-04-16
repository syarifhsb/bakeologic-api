import { OpenAPIHono } from "@hono/zod-openapi";
import { apiReference } from "@scalar/hono-api-reference";
import { cors } from "hono/cors";
import { ENV } from "./env";
import { authRoute } from "./routes/auth";
import { cartRoute } from "./routes/cart";
import { categoriesRoute } from "./routes/categories";
import { productsRoute } from "./routes/products";
import { usersRoute } from "./routes/users";

const app = new OpenAPIHono();

app.use(cors());

app
  .basePath("/")
  .route("/products", productsRoute)
  .route("/categories", categoriesRoute)
  .route("/users", usersRoute)
  .route("/auth", authRoute)
  .route("/cart", cartRoute)
  .doc("/openapi.json", {
    openapi: "3.1.1",
    info: { title: "Bakeologic API", version: "1.0.0" },
  })
  .get("/", apiReference({ spec: { url: "/openapi.json" } }));

console.info(`Server is running on port :${ENV.PORT}`);

export default app;
