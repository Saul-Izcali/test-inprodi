import path from "path";
import express from "express";
import morgan from "morgan";
import { create } from "express-handlebars";

import rutasUsuarios from "./routes/usuarios.routes"
import rutasIndex from "./routes/index.routes"
import rutasVuelos from "./routes/vuelos.routes"

const app = express();

// configuraciones
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  create({
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    defaulLayout: "main",
    extname: ".hbs",
  }).engine
);
app.set("view engine", ".hbs");

// middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));

// rutas
app.use(rutasIndex);
app.use(rutasUsuarios);
app.use(rutasVuelos);

// rutas publicas
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  res.status(404).render("404");
});

export default app;
