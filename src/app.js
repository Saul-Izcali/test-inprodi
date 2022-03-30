// external imports
import path from "path";
import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser"
import { create } from "express-handlebars";

// own imports
import indexRoutes from './routes/index.routes'
import usersRoutes from "./routes/users.routes"
import flightsRoutes from "./routes/flights.routes"
import baggageRoutes from "./routes/baggages.routes"

import {createRoles} from "./libs/initialSetupRoles"
import {createBaggages} from "./libs/initialSetupBaggages"

const app = express();

// create users roles
createRoles();
createBaggages();

// settings
app.set("port", process.env.PORT || 3000);
app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  create({
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
    defaultLayout: "main",
    extname: ".hbs",
  }).engine
);
app.set("view engine", ".hbs");

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));

// routes
app.use(indexRoutes);
app.use(usersRoutes);
app.use(flightsRoutes);
app.use(baggageRoutes);

// public routes
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  res.status(404).render("404");
});

export default app;
