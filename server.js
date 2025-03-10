import express from "express";
import { createTable } from "./db/config.js";
import { router } from "./routes/tutorialsRoutes.js";
import errorHandler from "./middleware/errorHandler.js";
import notFound from "./middleware/notFound.js";

createTable();
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 8000;

app.use("/api/tutorials", router);

app.use(notFound);
app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`server listening on http://localhost:${PORT}`);
});
