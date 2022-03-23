import app from "./app";
import "./utils/mongoose";

app.listen(app.get("port"));
console.log(`Servidor en el puerto ${app.get("port")}`);
