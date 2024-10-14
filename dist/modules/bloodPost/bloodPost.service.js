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
const user_model_1 = require("../users/user.model");
const bloodPost_model_1 = require("./bloodPost.model");
const getAllBloodPosts = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bloodPost_model_1.BloodPost.find();
    if (!result) {
        throw new Error("Failed to get all blood event posts");
    }
    return result;
});
const bloodPostSendToDatabase = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bloodPost_model_1.BloodPost.create(payload);
    if (!result) {
        throw new Error("Failed to posting blood event");
    }
    return result;
});
const updateBloodPostToDatabase = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(payload);
    const result = yield bloodPost_model_1.BloodPost.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    if (!result) {
        throw new Error("Failed to update blood event post");
    }
    return result;
});
const saveDonationHistoryIntoDb = (id, postId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.User.findByIdAndUpdate(id, {
        $push: { donationHistory: postId.id },
    }, {
        new: true,
        runValidators: true,
    });
    if (!result) {
        throw new Error("Failed to add blood donation history");
    }
    return result;
});
exports.default = {
    getAllBloodPosts,
    bloodPostSendToDatabase,
    updateBloodPostToDatabase,
    saveDonationHistoryIntoDb,
};
