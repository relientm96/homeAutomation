import fs from "fs";

export interface MqttData {
  data: string;
  timestamp: string;
  type: string;
}

const _dataFilePath = "/home/pi/Documents/homeAutomationData/data.json";

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
  const data = fs.readFileSync(_dataFilePath).toString();
  const parsedData: MqttData[] = JSON.parse(data);
  return parsedData;
};

export const putToFile = (incomingData: MqttData) => {
  const currentData: MqttData[] = readFileData();
  const newDataList: MqttData[] = [...currentData, incomingData];
  _writeFileData(newDataList);
};
