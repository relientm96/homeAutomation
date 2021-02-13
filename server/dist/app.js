"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const PORT = 10130;
app.get("/", (req, res, next) => {
    res.send("Hello world! This is TSC");
});
app.listen(PORT, () => {
    console.log(`server started at http://localhost:${PORT}`);
});
