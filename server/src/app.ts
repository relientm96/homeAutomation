import express, { Application, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import { putToFile, MqttData, readFileData } from "./utils";

const app: Application = express();
const PORT = 10131;

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send("Hello world! This is TSC");
});

app.post("/", async (req: Request, res: Response, next: NextFunction) => {
  const incomingData: MqttData = req.body;
  await putToFile(incomingData);
  res.status(200).send("Added data to database!");
});

app.get(
  "/data/all",
  async (req: Request, res: Response, next: NextFunction) => {
    const data = readFileData();
    res.status(200).send(data);
  }
);

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
