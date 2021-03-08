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
exports.putToFile = exports.readFileData = void 0;
const fs_1 = __importDefault(require("fs"));
const _dataFilePath = "./data/data.json";
const _writeFileData = (toWriteData) => __awaiter(void 0, void 0, void 0, function* () {
    fs_1.default.writeFile("./data/data_tmp.json", JSON.stringify(toWriteData), (err) => {
        if (err)
            throw err;
        fs_1.default.rename("./data/data_tmp.json", _dataFilePath, () => {
            if (err)
                throw err;
            console.log("Successfully moved file");
        });
    });
});
const readFileData = () => {
    console.log("Attempting to read file from FUNCTION");
    const data = fs_1.default.readFileSync(_dataFilePath).toString();
    const parsedData = JSON.parse(data);
    console.log("Finished reading data from FUNCTION");
    return parsedData;
};
exports.readFileData = readFileData;
const putToFile = (incomingData) => {
    console.log("Attempting to read file data");
    const currentData = exports.readFileData();
    console.log("Finished reading file data", currentData);
    const newDataList = [...currentData, incomingData];
    console.log("Attempting to write new data");
    _writeFileData(newDataList);
    console.log("Finished request");
};
exports.putToFile = putToFile;
