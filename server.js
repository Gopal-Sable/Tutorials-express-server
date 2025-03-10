import express from "express";
import { router } from "./routes/tutorials.js";

const app = express();

const PORT = process.env.PORT || 8000;
app.use("/api/tutorials", router);
// app.get("/", (req, res) => {
//     res.status(200).json({ message: "hello" });
// });
app.listen(PORT, () => {
    console.log(`server listening on http://localhost:${PORT}`);
});
