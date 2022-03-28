import app from "./app";
import "./utils/mongoose";

app.listen(app.get("port"));
console.log(`Server on porte ${app.get("port")}`);
