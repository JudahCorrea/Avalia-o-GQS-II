import express, { json } from "express";
import produtoRoutes from "./routes/produtoRoutes";
import categoriaRoutes from "./routes/categoriaRoutes";
import estoqueRoutes from "./routes/estoqueRoutes";

const app = express();
const port = 3000;

app.use(json());
app.use("/api", produtoRoutes);
app.use("/api", categoriaRoutes);
app.use("/api", estoqueRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export default { app };
