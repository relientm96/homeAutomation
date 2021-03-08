import fs from "fs";

export interface MqttData {
  data: string;
  timestamp: string;
}

const _dataFilePath = "/home/pi/Documents/homeAutomationData/data.json";
//const _dataFilePath = "./data/data.json";

const _writeFileData = async (toWriteData: MqttData[]) => {
  fs.writeFile("data_tmp.json", JSON.stringify(toWriteData), (err) => {
    if (err) throw err;
    fs.rename("data_tmp.json", _dataFilePath, () => {
      if (err) throw err;
      console.log("Successfully moved file");
    });
  });
};

export const readFileData = (): MqttData[] => {
  console.log("Attempting to read file from FUNCTION");
  const data = fs.readFileSync(_dataFilePath).toString();
  const parsedData = JSON.parse(data);
  console.log("Finished reading data from FUNCTION");
  return parsedData;
};

export const putToFile = (incomingData: MqttData) => {
  console.log("Attempting to read file data");
  const currentData = readFileData();
  console.log("Finished reading file data", currentData);
  const newDataList = [...currentData, incomingData];
  console.log("Attempting to write new data");
  _writeFileData(newDataList);
  console.log("Finished request");
};
