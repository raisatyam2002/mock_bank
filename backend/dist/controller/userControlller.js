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
exports.loginController = loginController;
const Users_1 = __importDefault(require("../models/Users"));
function loginController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { phoneNumber } = req.body;
        try {
            if (phoneNumber) {
                const user = yield Users_1.default.findOne({
                    phoneNumber: phoneNumber,
                });
                console.log(user);
                if (user) {
                    return res.status(200).send({
                        user,
                        success: true,
                    });
                }
                else {
                    return res.status(200).send({
                        message: "invalid credentials",
                        success: false,
                    });
                }
            }
            return res.status(200).send({
                message: "invalid credentials",
                success: false,
            });
        }
        catch (error) {
            return res.status(400).send({
                error,
                success: false,
            });
        }
    });
}
