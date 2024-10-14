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
const user_service_1 = __importDefault(require("./user.service"));
const sendResponse_1 = require("../../util/sendResponse");
const activeUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.default.getAllActiveUsers();
        res.status(200).json({
            success: true,
            message: "Retrieved all active users",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
const usersWithDonationHistory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.default.getAllUsersWithDonationHistory();
        res.status(200).json({
            success: true,
            message: "Retrieved all users with respective donation history",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
const getSingleUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.query;
    try {
        const result = yield user_service_1.default.getSingleUser(name);
        res.status(200).json({
            success: true,
            message: "Retrieved single user successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user } = req.body;
        //console.log("user from controller", user);
        const result = yield user_service_1.default.createUserRegistration(user);
        res.status(200).json({
            success: true,
            message: "User is Registered successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("err");
    try {
        const { id } = req.params;
        const { user } = req.body;
        const result = yield user_service_1.default.updateUserRegistration(id, user);
        (0, sendResponse_1.sendResponse)(res, {
            success: true,
            message: "User profile is updated successfully",
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.default = {
    createUser,
    updateUser,
    activeUsers,
    usersWithDonationHistory,
    getSingleUser,
};
