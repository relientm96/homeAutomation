import express, { Application, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";

import { putToFile } from "./utils";

const app: Application = express();
const PORT = 10131;

// Middlewares
app.use(bodyParser.json());

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("Hello world! This is TSC");
});

app.post("/", async (req: Request, res: Response, next: NextFunction) => {
  const incomingData = req.body;
  //await putToFile(incomingData);
  res.status(200).send("Added data to database!");
});

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
