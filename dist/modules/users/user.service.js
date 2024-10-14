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
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("./user.model");
const getAllActiveUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.find({ donationAvailability: true });
    if (!result) {
        throw new Error("Failed to retrieve all active users");
    }
    return result;
});
const getAllUsersWithDonationHistory = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.find().populate({
        path: "donationHistory",
        strictPopulate: false,
    });
    if (!result) {
        throw new Error("Failed to retrieve all active users");
    }
    return result;
});
const getSingleUser = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.find({ name });
    if (!result) {
        throw new Error("Failed to retrieve single user");
    }
    return result;
});
const createUserRegistration = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserAlreadyExist = yield user_model_1.User.findOne({ name: payload.name });
    if (isUserAlreadyExist) {
        throw new Error("User is already exists");
    }
    const result = yield user_model_1.User.create(payload);
    if (!result) {
        throw new Error("Failed to register new user");
    }
    return result;
});
const updateUserRegistration = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!result) {
        throw new Error("Failed to update user profile");
    }
    return result;
});
exports.default = {
    createUserRegistration,
    updateUserRegistration,
    getAllActiveUsers,
    getAllUsersWithDonationHistory,
    getSingleUser,
};
