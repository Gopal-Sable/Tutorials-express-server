import express from "express";
import sequelize from "./db/db.js";
import { router } from "./routes/tutorials.js";

sequelize.sync().then(() => console.log("db ready"));
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 8000;
app.use("/api/tutorials", router);

app.listen(PORT, () => {
    console.log(`server listening on http://localhost:${PORT}`);
});
