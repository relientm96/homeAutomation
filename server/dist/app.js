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
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const utils_1 = require("./utils");
const app = express_1.default();
const PORT = 10131;
// Middlewares
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.get("/server", (req, res, next) => {
    res.send("Hello world! This is TSC");
});
app.post("/server", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const incomingData = req.body;
    yield utils_1.putToFile(incomingData);
    res.status(200).send("Added data to database!");
}));
app.get("/server/data/all", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = utils_1.readFileData();
    res.status(200).send(data);
}));
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});
