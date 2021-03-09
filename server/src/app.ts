import express, { Application, Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import {
  putToFile,
  readHumidity,
  readTemperature,
  registerDevice,
  readDevices,
} from "./utils";

import { MqttData, DeviceData } from "./types";

const app: Application = express();
const PORT = 10131;

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// End point to post data from mqtt devices
app.post("/server", async (req: Request, res: Response, next: NextFunction) => {
  const incomingData: MqttData = req.body;
  putToFile(incomingData);
  res.status(200).send("Added data to database!");
  res.end();
});

// Handle post routes from devices connecting to network
app.post(
  "/server/devices",
  async (req: Request, res: Response, next: NextFunction) => {
    const device_notif: DeviceData = req.body;
    registerDevice(device_notif);
    // Reading device data and writing
    res.status(200).send("Got a device connect notification!");
    res.end();
  }
);

app.get("/server", (req: Request, res: Response, next: NextFunction) => {
  res.send("Hello world! This is TSC");
});

app.get(
  "/server/data/temperature",
  (req: Request, res: Response, next: NextFunction) => {
    const data = readTemperature();
    res.status(200).send(data);
  }
);

app.get(
  "/server/data/humidity",
  (req: Request, res: Response, next: NextFunction) => {
    const data = readHumidity();
    res.status(200).send(data);
  }
);

app.get(
  "/server/data/devices",
  (req: Request, res: Response, next: NextFunction) => {
    const data = readDevices();
    res.status(200).send(data);
  }
);

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
