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
exports.generateResponse = void 0;
const geminiService_1 = __importDefault(require("../services/geminiService"));
const errorHandler_1 = require("../utils/errorHandler");
const generateResponse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const geminiRequest = req.body;
        // Validate request
        if (!geminiRequest.prompt) {
            res.status(400).json({ error: 'Prompt is required', status: 400 });
            return;
        }
        // Generate response from Gemini
        const response = yield geminiService_1.default.generateResponse(geminiRequest);
        res.status(200).json(response);
    }
    catch (error) {
        (0, errorHandler_1.handleError)(res, error);
    }
});
exports.generateResponse = generateResponse;
