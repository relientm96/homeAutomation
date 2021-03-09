"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.putToFile = exports.readDevices = exports.readTemperature = exports.readHumidity = exports.registerDevice = void 0;
const fs_1 = __importDefault(require("fs"));
const _dataFilePath = "/home/pi/Documents/homeAutomationData/";
const _humidDataFile = `${_dataFilePath}/data_humid.json`;
const _tempDataFile = `${_dataFilePath}/data_temp.json`;
const _deviceFile = `${_dataFilePath}/data_device.json`;
const _writeFileData = (toWriteData, filePathInput) => __awaiter(void 0, void 0, void 0, function* () {
    fs_1.default.writeFile("data_tmp.json", JSON.stringify(toWriteData), (err) => {
        if (err)
            throw err;
        fs_1.default.rename("data_tmp.json", filePathInput, () => {
            if (err)
                throw err;
            console.log("Successfully moved file");
        });
    });
});
const _readFileData = (filepath) => {
    const data = fs_1.default.readFileSync(filepath).toString();
    const parsedData = JSON.parse(data);
    return parsedData;
};
const registerDevice = (deviceNotif) => {
    const currentDeviceList = _readFileData(_deviceFile);
    const newDeviceList = [...currentDeviceList, deviceNotif];
    _writeFileData(newDeviceList, _deviceFile);
};
exports.registerDevice = registerDevice;
const readHumidity = () => _readFileData(_humidDataFile);
exports.readHumidity = readHumidity;
const readTemperature = () => _readFileData(_tempDataFile);
exports.readTemperature = readTemperature;
const readDevices = () => _readFileData(_deviceFile);
exports.readDevices = readDevices;
const putToFile = (incomingData) => {
    let filePath = "";
    if (incomingData["type"] === "humidity") {
        filePath = _humidDataFile;
    }
    else if (incomingData["type"] === "temperature") {
        filePath = _tempDataFile;
    }
    else {
        console.log("Unknown message type");
        return;
    }
    const currentData = _readFileData(filePath);
    const newDataList = [...currentData, incomingData];
    _writeFileData(newDataList, filePath);
};
exports.putToFile = putToFile;
