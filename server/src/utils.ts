import fs from "fs";

import { MqttData, DeviceData } from "./types";

const _dataFilePath = "/home/pi/Documents/homeAutomationData/";
const _humidDataFile = `${_dataFilePath}/data_humid.json`;
const _tempDataFile = `${_dataFilePath}/data_temp.json`;
const _deviceFile = `${_dataFilePath}/data_device.json`;

const _writeFileData = async (
  toWriteData: MqttData[] | DeviceData[],
  filePathInput: string
) => {
  fs.writeFile("data_tmp.json", JSON.stringify(toWriteData), (err) => {
    if (err) throw err;
    fs.rename("data_tmp.json", filePathInput, () => {
      if (err) throw err;
      console.log("Successfully moved file");
    });
  });
};

const _readFileData = (filepath: string) => {
  const data = fs.readFileSync(filepath).toString();
  const parsedData = JSON.parse(data);
  return parsedData;
};

export const registerDevice = (deviceNotif: DeviceData) => {
  const currentDeviceList = _readFileData(_deviceFile);
  const newDeviceList = [...currentDeviceList, deviceNotif];
  _writeFileData(newDeviceList, _deviceFile);
};

export const readHumidity = () => _readFileData(_humidDataFile);

export const readTemperature = () => _readFileData(_tempDataFile);

export const readDevices = () => _readFileData(_deviceFile);

export const putToFile = (incomingData: MqttData) => {
  let filePath = "";
  if (incomingData["type"] === "humidity") {
    filePath = _humidDataFile;
  } else if (incomingData["type"] === "temperature") {
    filePath = _tempDataFile;
  } else {
    console.log("Unknown message type");
    return;
  }
  const currentData = _readFileData(filePath);
  const newDataList = [...currentData, incomingData];
  _writeFileData(newDataList, filePath);
};
