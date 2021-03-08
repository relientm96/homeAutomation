import fs from "fs";

export interface MqttData {
  data: string;
  timestamp: string;
}

const _dataFilePath = "./data/data.json";

const _writeFileData = async (toWriteData: MqttData[]) => {
  fs.writeFile("./data/data_tmp.json", JSON.stringify(toWriteData), (err) => {
    if (err) throw err;
    fs.rename("./data/data_tmp.json", _dataFilePath, () => {
      if (err) throw err;
      console.log("Successfully moved file");
    });
  });
};

export const readFileData = (): MqttData[] => {
  const data = fs.readFileSync(_dataFilePath).toString();
  const parsedData = JSON.parse(data);
  return parsedData;
};

export const putToFile = (incomingData: MqttData) => {
  const currentData = readFileData();
  const newDataList = [...currentData, incomingData];
  _writeFileData(newDataList);
};
